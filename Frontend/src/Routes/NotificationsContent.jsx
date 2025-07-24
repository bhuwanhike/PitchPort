import React, { useState } from 'react';
import { Mail, Bell, MessageSquare, Zap, Gift } from 'lucide-react';
import { Briefcase } from 'lucide-react';

// --- HELPER COMPONENTS ---

const SettingsCard = ({ title, description, children, footer }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl">
        <div className="p-6">
            <h2 className="text-xl font-bold text-white">{title}</h2>
            {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
        </div>
        <div className="divide-y divide-slate-700/80">
            {children}
        </div>
        {footer && (
            <div className="p-6 bg-slate-800/30 border-t border-slate-700/80 rounded-b-2xl flex justify-end">
                {footer}
            </div>
        )}
    </div>
);

const ToggleSwitch = ({ enabled, setEnabled }) => (
    <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
            enabled ? 'bg-cyan-500' : 'bg-slate-700'
        }`}
    >
        <span
            className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
            }`}
        />
    </button>
);

const NotificationSetting = ({ icon, title, description, emailEnabled, setEmailEnabled, pushEnabled, setPushEnabled }) => (
    <div className="p-6 grid grid-cols-3 items-center gap-4">
        <div className="col-span-3 md:col-span-2 flex items-start gap-4">
            <div className="w-10 h-10 flex-shrink-0 rounded-lg bg-slate-700/50 flex items-center justify-center text-cyan-400">
                {icon}
            </div>
            <div>
                <h3 className="font-semibold text-white">{title}</h3>
                <p className="text-sm text-slate-400">{description}</p>
            </div>
        </div>
        <div className="col-span-3 md:col-span-1 flex items-center justify-end md:justify-between gap-6">
            <div className="flex flex-col items-center">
                <Mail className="w-5 h-5 text-slate-500 mb-2" />
                <ToggleSwitch enabled={emailEnabled} setEnabled={setEmailEnabled} />
            </div>
            <div className="flex flex-col items-center">
                <Bell className="w-5 h-5 text-slate-500 mb-2" />
                <ToggleSwitch enabled={pushEnabled} setEnabled={setPushEnabled} />
            </div>
        </div>
    </div>
);


// --- MAIN NOTIFICATIONS PAGE COMPONENT ---

const NotificationsContent = () => {
    // Dummy state for demonstration
    const [notifications, setNotifications] = useState({
        newPitches: { email: true, push: true },
        investmentUpdates: { email: true, push: false },
        directMessages: { email: true, push: true },
        platformUpdates: { email: false, push: true },
        promotions: { email: true, push: false },
    });

    const handleToggle = (category, type) => {
        setNotifications(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [type]: !prev[category][type]
            }
        }));
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-bold text-white font-poppins">Notifications</h1>
                <p className="text-slate-400 mt-1">Manage how you receive notifications from PitchPort.</p>
            </div>

            {/* Notification Settings */}
            <SettingsCard
                title="Pitch & Investment Alerts"
                footer={
                    <button type="button" className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors">
                        Save Preferences
                    </button>
                }
            >
                <NotificationSetting
                    icon={<Zap />}
                    title="New Pitches"
                    description="Get notified when a new startup pitch matches your investment criteria."
                    emailEnabled={notifications.newPitches.email}
                    setEmailEnabled={() => handleToggle('newPitches', 'email')}
                    pushEnabled={notifications.newPitches.push}
                    setPushEnabled={() => handleToggle('newPitches', 'push')}
                />
                <NotificationSetting
                    icon={<Briefcase />}
                    title="Investment Updates"
                    description="Receive updates on funding rounds for startups in your portfolio."
                    emailEnabled={notifications.investmentUpdates.email}
                    setEmailEnabled={() => handleToggle('investmentUpdates', 'email')}
                    pushEnabled={notifications.investmentUpdates.push}
                    setPushEnabled={() => handleToggle('investmentUpdates', 'push')}
                />
                <NotificationSetting
                    icon={<MessageSquare />}
                    title="Direct Messages"
                    description="Get alerts when a founder or investor sends you a direct message."
                    emailEnabled={notifications.directMessages.email}
                    setEmailEnabled={() => handleToggle('directMessages', 'email')}
                    pushEnabled={notifications.directMessages.push}
                    setPushEnabled={() => handleToggle('directMessages', 'push')}
                />
            </SettingsCard>
            
            <SettingsCard
                title="General Notifications"
            >
                 <NotificationSetting
                    icon={<Bell />}
                    title="Platform Updates"
                    description="Receive news about new features and improvements to PitchPort."
                    emailEnabled={notifications.platformUpdates.email}
                    setEmailEnabled={() => handleToggle('platformUpdates', 'email')}
                    pushEnabled={notifications.platformUpdates.push}
                    setPushEnabled={() => handleToggle('platformUpdates', 'push')}
                />
                 <NotificationSetting
                    icon={<Gift />}
                    title="Promotions & Offers"
                    description="Get notified about special offers, events, and partnerships."
                    emailEnabled={notifications.promotions.email}
                    setEmailEnabled={() => handleToggle('promotions', 'email')}
                    pushEnabled={notifications.promotions.push}
                    setPushEnabled={() => handleToggle('promotions', 'push')}
                />
            </SettingsCard>

            <style jsx>{`
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
                .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards; }
            `}</style>
        </div>
    );
};

export default NotificationsContent;
