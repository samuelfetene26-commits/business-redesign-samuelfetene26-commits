import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/stores/authStore';
import { Copy, Eye, EyeOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function JWTTokenViewer() {
  const { getTokenInfo, user } = useAuthStore();
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);

  const tokenInfo = getTokenInfo();

  if (!tokenInfo || !user) {
    return null;
  }

  const { token, payload, isExpired } = tokenInfo;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(token);
    setCopied(true);
    toast.success('Token copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getExpirationStatus = () => {
    if (!payload.exp) return { status: 'unknown', color: 'text-gray-600', bg: 'bg-gray-100' };
    const now = Math.floor(Date.now() / 1000);
    const timeLeft = payload.exp - now;
    const daysLeft = Math.floor(timeLeft / (24 * 60 * 60));

    if (isExpired) {
      return { status: 'Expired', color: 'text-red-600', bg: 'bg-red-100' };
    } else if (daysLeft <= 1) {
      return { status: `Expires in ${daysLeft} day`, color: 'text-orange-600', bg: 'bg-orange-100' };
    } else {
      return { status: `Valid for ${daysLeft} days`, color: 'text-green-600', bg: 'bg-green-100' };
    }
  };

  const expirationStatus = getExpirationStatus();

  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
          🔐 JWT Token Information
        </h3>
        <p className="text-sm text-gray-600">
          Your authentication token for API requests and session management
        </p>
      </div>

      {/* Token Status */}
      <div className="mb-6 p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <span className="font-semibold text-gray-900">Token Status</span>
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${expirationStatus.bg}`}>
            {isExpired ? (
              <AlertCircle className={`w-4 h-4 ${expirationStatus.color}`} />
            ) : (
              <CheckCircle className={`w-4 h-4 ${expirationStatus.color}`} />
            )}
            <span className={`text-sm font-semibold ${expirationStatus.color}`}>
              {expirationStatus.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600 mb-1">Issued At</p>
            <p className="font-mono text-gray-900">{formatDate(payload.iat)}</p>
          </div>
          {payload.exp && (
            <div>
              <p className="text-gray-600 mb-1">Expires At</p>
              <p className="font-mono text-gray-900">{formatDate(payload.exp)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Token Payload */}
      <div className="mb-6 p-4 rounded-lg bg-white border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Token Payload</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span className="font-mono text-gray-900">{payload.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Role:</span>
            <span className="font-mono text-gray-900 capitalize">{payload.role}</span>
          </div>
          {payload.userId && (
            <div className="flex justify-between">
              <span className="text-gray-600">User ID:</span>
              <span className="font-mono text-gray-900 text-xs">{payload.userId}</span>
            </div>
          )}
        </div>
      </div>

      {/* Full Token */}
      <div className="mb-6 p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-900">Full JWT Token</h4>
          <button
            onClick={() => setShowToken(!showToken)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title={showToken ? 'Hide token' : 'Show token'}
          >
            {showToken ? (
              <EyeOff className="w-4 h-4 text-gray-600" />
            ) : (
              <Eye className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        <div className="relative">
          <div className="p-3 bg-gray-900 rounded font-mono text-xs text-green-400 break-all overflow-auto max-h-24">
            {showToken ? token : token.substring(0, 50) + '...'}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={copyToClipboard}
            className="absolute top-2 right-2"
          >
            <Copy className="w-4 h-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
        </div>
      </div>

      {/* Token Structure Explanation */}
      <div className="p-4 rounded-lg bg-white border border-gray-200">
        <h4 className="font-semibold text-gray-900 mb-3">Token Structure</h4>
        <div className="space-y-2 text-xs text-gray-600">
          <p>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">Header</span>
            {' '}Contains algorithm (HS256) and token type (JWT)
          </p>
          <p>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">Payload</span>
            {' '}Contains user data (email, role, user ID, timestamps)
          </p>
          <p>
            <span className="font-mono bg-gray-100 px-2 py-1 rounded">Signature</span>
            {' '}Verifies token authenticity and integrity
          </p>
          <p className="mt-3 text-gray-700 font-semibold">
            Format: <span className="font-mono">Header.Payload.Signature</span>
          </p>
        </div>
      </div>

      {/* Usage Info */}
      <div className="mt-6 p-4 rounded-lg bg-indigo-100 border border-indigo-200">
        <p className="text-sm text-indigo-900">
          <span className="font-semibold">💡 Tip:</span> Use this token for API requests in the Authorization header:
          <br />
          <span className="font-mono text-xs mt-2 block">Authorization: Bearer {token.substring(0, 30)}...</span>
        </p>
      </div>
    </Card>
  );
}
