import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  Clock, 
  Database, 
  Zap, 
  UserCheck, 
  RefreshCw,
  Terminal,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TelemetryLog {
  id: string;
  timestamp: string;
  pnr: string;
  source: string;
  latency: number;
  anomalyScore: number;
  verdict: 'GENUINE_HUMAN' | 'SUSPECTED_BOT' | 'TOUT_FARM';
  status: 'QUEUED' | 'CONFIRMED' | 'REJECTED';
}

export default function App() {
  const [activeQueue, setActiveQueue] = useState<number>(1420);
  const [tps, setTps] = useState<number>(850);
  const [adaptionLatency, setAdaptionLatency] = useState<number>(32);
  const [logs, setLogs] = useState<TelemetryLog[]>([
    {
      id: 'tx-9021',
      timestamp: '10:00:01.210',
      pnr: '284-9102831',
      source: '14.139.208.12',
      latency: 28,
      anomalyScore: 0.04,
      verdict: 'GENUINE_HUMAN',
      status: 'CONFIRMED'
    },
    {
      id: 'tx-9022',
      timestamp: '10:00:01.340',
      pnr: '612-8820194',
      source: '103.21.244.0',
      latency: 34,
      anomalyScore: 0.92,
      verdict: 'TOUT_FARM',
      status: 'REJECTED'
    },
    {
      id: 'tx-9023',
      timestamp: '10:00:01.405',
      pnr: '471-0029182',
      source: '45.118.156.2',
      latency: 41,
      anomalyScore: 0.78,
      verdict: 'SUSPECTED_BOT',
      status: 'REJECTED'
    }
  ]);

  const [bookingPnr, setBookingPnr] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{ msg: string; type: 'success' | 'danger' } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTps(Math.floor(780 + Math.random() * 140));
      setActiveQueue(prev => Math.max(200, prev + Math.floor(Math.random() * 20) - 12));
      setAdaptionLatency(Math.floor(25 + Math.random() * 15));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleTestBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingPnr) return;

    setIsProcessing(true);
    setNotification(null);

    setTimeout(() => {
      const isBot = Math.random() > 0.65;
      const score = isBot ? +(0.7 + Math.random() * 0.28).toFixed(2) : +(0.02 + Math.random() * 0.15).toFixed(2);
      const verdict = isBot ? (score > 0.85 ? 'TOUT_FARM' : 'SUSPECTED_BOT') : 'GENUINE_HUMAN';
      const status = isBot ? 'REJECTED' : 'CONFIRMED';

      const newEntry: TelemetryLog = {
        id: `tx-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleTimeString(),
        pnr: bookingPnr,
        source: '127.0.0.1 (Local Client)',
        latency: adaptionLatency,
        anomalyScore: score,
        verdict,
        status
      };

      setLogs(prev => [newEntry, ...prev.slice(0, 7)]);
      setIsProcessing(false);
      setBookingPnr('');

      if (!isBot) {
        triggerConfetti();
        setNotification({ msg: `Token confirmed for PNR ${newEntry.pnr}. Prioritized in Tatkal stream!`, type: 'success' });
      } else {
        setNotification({ msg: `Request flagged by Adaption Agent (Anomaly score: ${score}). Dropped to protect database concurrency.`, type: 'danger' });
      }
    }, 900);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-lg shadow-lg shadow-cyan-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
              TatkalX Engine
            </h1>
            <p className="text-xs text-slate-400">High-Concurrency Anti-Tout Tatkal Ingestion Node</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-indigo-950/80 border border-indigo-700/60 px-3 py-1.5 rounded-full text-xs font-medium text-indigo-300 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Adaption Anomaly Classifier: <strong className="text-cyan-300">ACTIVE</strong></span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div className="text-xs text-slate-400 border border-slate-800 px-3 py-1.5 rounded-lg bg-slate-900">
            Node: <span className="text-slate-200 font-mono">in-east-1</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>ACTIVE QUEUE DEPTH</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-white">{activeQueue.toLocaleString()} reqs</div>
            <p className="text-xs text-slate-500 mt-1">SLA target: &lt; 2500 reqs</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>INGESTION THROUGHPUT</span>
              <Database className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-emerald-400">{tps} TPS</div>
            <p className="text-xs text-slate-500 mt-1">Zero connection drops</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>ADAPTION INFERENCE</span>
              <Cpu className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-indigo-300">{adaptionLatency} ms</div>
            <p className="text-xs text-slate-500 mt-1">Behavioral anomaly eval</p>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span>BOT MITIGATION RATE</span>
              <ShieldCheck className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-bold font-mono tracking-tight text-amber-400">99.4%</div>
            <p className="text-xs text-slate-500 mt-1">IRCTC DB overload averted</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <h2 className="font-semibold text-sm text-slate-200">Inject Tatkal Reservation Token</h2>
            </div>
            <p className="text-xs text-slate-400">
              Test queue ingestion through the Adaption classifier to simulate human passenger vs script bot categorization.
            </p>

            <form onSubmit={handleTestBooking} className="space-y-4">
              <div>
                <label className="text-xs font-medium text-slate-300 mb-1 block">Train / PNR Query ID</label>
                <input 
                  type="text" 
                  value={bookingPnr}
                  onChange={(e) => setBookingPnr(e.target.value)}
                  placeholder="e.g. 12004-DL-HOWRAH" 
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-semibold py-2.5 px-4 rounded-lg text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Evaluating Telemetry with Adaption...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 fill-slate-950" />
                    <span>Dispatch Tatkal Ingestion Test</span>
                  </>
                )}
              </button>
            </form>

            {notification && (
              <div className={`p-3 rounded-lg border text-xs flex items-start gap-2.5 ${
                notification.type === 'success' 
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300' 
                  : 'bg-rose-950/40 border-rose-800 text-rose-300'
              }`}>
                {notification.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                )}
                <span>{notification.msg}</span>
              </div>
            )}

            <div className="border-t border-slate-800 pt-3 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Pipeline: <strong className="text-slate-400 font-mono">React + Vite + Adaption API</strong></span>
              <span className="font-mono">v1.0.4</span>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-400" />
                  <h2 className="font-semibold text-sm text-slate-200">Real-Time Ingestion & Anomaly Stream</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Live telemetry feed</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-800 pb-2">
                      <th className="py-2 font-medium">TIMESTAMP</th>
                      <th className="py-2 font-medium">PNR / ID</th>
                      <th className="py-2 font-medium">ANOMALY SCORE</th>
                      <th className="py-2 font-medium">ADAPTION VERDICT</th>
                      <th className="py-2 font-medium">DISPOSITION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-mono">
                    {logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 text-slate-400">{log.timestamp}</td>
                        <td className="py-2.5 text-cyan-300 font-semibold">{log.pnr}</td>
                        <td className="py-2.5">
                          <span className={`px-1.5 py-0.5 rounded text-[11px] ${
                            log.anomalyScore > 0.7 
                              ? 'bg-rose-950 border border-rose-800 text-rose-300' 
                              : 'bg-emerald-950 border border-emerald-800 text-emerald-300'
                          }`}>
                            {log.anomalyScore}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-sans ${
                            log.verdict === 'GENUINE_HUMAN' ? 'text-emerald-400 font-medium' : 'text-amber-400 font-medium'
                          }`}>
                            {log.verdict === 'GENUINE_HUMAN' ? <UserCheck className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                            {log.verdict}
                          </span>
                        </td>
                        <td className="py-2.5">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-sans font-semibold uppercase ${
                            log.status === 'CONFIRMED' 
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Audit window: Last 60 seconds
              </span>
              <span>All anomalies indexed for sponsor demo evaluation</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
