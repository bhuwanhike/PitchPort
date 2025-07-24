import React, { useState, useMemo } from 'react';
import { KeyRound, Smartphone, ShieldCheck, Monitor, LogOut, ShieldAlert, Wifi, WifiOff } from 'lucide-react';

// --- DUMMY DATA ---
const loginSessions = [
    { id: 1, browser: 'Chrome on Windows', location: 'Ghaziabad, India', time: 'Active now', isCurrent: true },
    { id: 2, browser: 'Safari on iPhone', location: 'Mumbai, India', time: '2 hours ago', isCurrent: false },
    { id: 3, browser: 'Firefox on macOS', location: 'Bengaluru, India', time: '1 day ago', isCurrent: false },
];

// --- HELPER COMPONENTS ---

const SettingsCard = ({ title, description, children, footer, isDangerZone = false }) => (
    <div className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl ${isDangerZone ? 'border-red-500/30' : 'border-slate-700/80'}`}>
        <div className="p-6 border-b border-slate-700/80">
            <h2 className={`text-xl font-bold ${isDangerZone ? 'text-red-400' : 'text-white'}`}>{title}</h2>
            <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
        <div className="p-6">
            {children}
        </div>
        {footer && (
            <div className={`p-6 bg-slate-800/30 border-t rounded-b-2xl flex justify-end ${isDangerZone ? 'border-red-500/20' : 'border-slate-700/80'}`}>
                {footer}
            </div>
        )}
    </div>
);

const FormField = ({ label, children }) => (
    <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
        {children}
    </div>
);

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = useMemo(() => {
        let score = 0;
        if (!password) return score;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        return score;
    }, [password]);

    const strength = getStrength;
    const colors = ['bg-red-500', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500', 'bg-green-500'];
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];

    return (
        <div className="flex items-center gap-3 mt-2">
            <div className="w-full bg-slate-700 rounded-full h-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-2 flex-1 rounded-full ${strength > i ? colors[strength] : ''}`}></div>
                ))}
            </div>
            <span className="text-xs font-semibold text-slate-400 w-20 text-right">{labels[strength]}</span>
        </div>
    );
};


// --- MAIN SECURITY PAGE COMPONENT ---

const SecurityContent = () => {
    const [is2faEnabled, setIs2faEnabled] = useState(true);
    const [newPassword, setNewPassword] = useState('');

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white font-poppins">Security Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account's security settings and keep it safe.</p>
            </div>

            {/* Change Password Section */}
            <SettingsCard
                title="Password"
                description="Change your password regularly to keep your account secure."
                footer={
                    <button type="button" className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors">
                        Update Password
                    </button>
                }
            >
                <form className="space-y-4">
                    <FormField label="Current Password">
                        <input type="password" name="currentPassword" placeholder="••••••••" className="input-field" />
                    </FormField>
                    <FormField label="New Password">
                        <input type="password" name="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="••••••••" className="input-field" />
                        <PasswordStrengthMeter password={newPassword} />
                    </FormField>
                </form>
            </SettingsCard>

            {/* Two-Factor Authentication Section */}
            <SettingsCard
                title="Two-Factor Authentication (2FA)"
                description="Add an extra layer of security to your account using an authenticator app."
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${is2faEnabled ? 'bg-green-500/10' : 'bg-slate-700'}`}>
                            {is2faEnabled ? <ShieldCheck className="w-6 h-6 text-green-400" /> : <ShieldAlert className="w-6 h-6 text-slate-400" />}
                        </div>
                        <div>
                            <p className="font-semibold text-white">{is2faEnabled ? "2FA is Enabled" : "2FA is Disabled"}</p>
                            <p className="text-sm text-slate-400">
                                {is2faEnabled ? "Your account is protected with an additional layer of security." : "We strongly recommend enabling 2FA."}
                            </p>
                        </div>
                    </div>
                    <button type="button" className="bg-slate-700/80 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all">
                        {is2faEnabled ? "Manage 2FA" : "Enable 2FA"}
                    </button>
                </div>
            </SettingsCard>

            {/* Login Sessions Section */}
            <SettingsCard
                title="Login Sessions"
                description="This is a list of devices that have logged into your account. Revoke any sessions you do not recognize."
            >
                <div className="space-y-4">
                    {loginSessions.map(session => (
                        <div key={session.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <Monitor className="w-6 h-6 text-slate-500" />
                                <div>
                                    <p className="font-semibold text-white">{session.browser}</p>
                                    <p className="text-sm text-slate-400">{session.location} - <span className={session.isCurrent ? 'text-green-400' : ''}>{session.time}</span></p>
                                </div>
                            </div>
                            {session.isCurrent ? (
                                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5"><Wifi className="w-3.5 h-3.5"/>Current Session</span>
                            ) : (
                                <button className="text-xs text-slate-400 hover:text-red-400 font-semibold">Revoke</button>
                            )}
                        </div>
                    ))}
                </div>
            </SettingsCard>

            {/* Danger Zone */}
            <SettingsCard
                title="Danger Zone"
                description="These actions are permanent and cannot be undone."
                isDangerZone={true}
                footer={
                     <button type="button" className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors">
                        Delete My Account
                    </button>
                }
            >
                 <div className="flex items-center justify-between">
                    <div>
                        <p className="font-semibold text-white">Log out of all sessions</p>
                        <p className="text-sm text-slate-400">This will sign you out of PitchPort on all devices.</p>
                    </div>
                     <button type="button" className="flex-shrink-0 bg-slate-700/80 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all">
                        Log Out All
                    </button>
                </div>
            </SettingsCard>
            
            <style jsx>{`
                .input-field {
                  @apply w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500;
                }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default SecurityContent;
