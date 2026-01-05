import { useState } from 'react';
import { Switch } from './Switch';

const SwitchExample = () => {
  const [singleSwitch, setSingleSwitch] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: false,
    sms: true,
    newsletter: false,
  });
  const [privacySettings, setPrivacySettings] = useState({
    publicProfile: false,
    showEmail: false,
    showPhone: true,
  });

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Switch Examples</h1>

      {/* Single Switch */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Single Switch</h2>
        <Switch
          label="Enable notifications"
          description="Receive notifications about your account activity"
          checked={singleSwitch}
          onCheckedChange={setSingleSwitch}
        />
        <p className="text-sm text-gray-600">
          Status: {singleSwitch ? 'Enabled' : 'Disabled'}
        </p>
      </div>

      {/* Switch without Description */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Switch without Description</h2>
        <Switch
          label="Dark mode"
          checked={false}
          onCheckedChange={() => {}}
        />
      </div>

      {/* Required Switch */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Required Switch</h2>
        <Switch
          label="I agree to the terms and conditions"
          description="You must agree to continue"
          checked={false}
          onCheckedChange={() => {}}
          required
        />
      </div>

      {/* Disabled States */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Disabled States</h2>
        <div className="space-y-3">
          <Switch
            label="Disabled (Off)"
            description="This switch is disabled"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <Switch
            label="Disabled (On)"
            description="This switch is disabled and checked"
            checked={true}
            onCheckedChange={() => {}}
            disabled
          />
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Different Sizes</h2>
        <div className="space-y-3">
          <Switch
            label="Small Switch"
            description="This is a small switch"
            checked={false}
            onCheckedChange={() => {}}
            size="sm"
          />
          <Switch
            label="Default Switch"
            description="This is a default switch"
            checked={true}
            onCheckedChange={() => {}}
            size="default"
          />
          <Switch
            label="Large Switch"
            description="This is a large switch"
            checked={false}
            onCheckedChange={() => {}}
            size="lg"
          />
        </div>
      </div>

      {/* Notification Settings Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Notification Settings</h2>
        <div className="space-y-3 border border-gray-200 rounded-lg p-4">
          <Switch
            label="Email Notifications"
            description="Receive email updates and alerts"
            checked={notificationSettings.email}
            onCheckedChange={(checked) =>
              setNotificationSettings({ ...notificationSettings, email: checked })
            }
          />
          <Switch
            label="Push Notifications"
            description="Get push notifications on your devices"
            checked={notificationSettings.push}
            onCheckedChange={(checked) =>
              setNotificationSettings({ ...notificationSettings, push: checked })
            }
          />
          <Switch
            label="SMS Notifications"
            description="Receive text message alerts"
            checked={notificationSettings.sms}
            onCheckedChange={(checked) =>
              setNotificationSettings({ ...notificationSettings, sms: checked })
            }
          />
          <Switch
            label="Newsletter Subscription"
            description="Weekly newsletter with updates and tips"
            checked={notificationSettings.newsletter}
            onCheckedChange={(checked) =>
              setNotificationSettings({
                ...notificationSettings,
                newsletter: checked,
              })
            }
          />
        </div>
        <div className="text-sm text-gray-600">
          <p>Active notifications:</p>
          <ul className="list-disc list-inside">
            {notificationSettings.email && <li>Email</li>}
            {notificationSettings.push && <li>Push</li>}
            {notificationSettings.sms && <li>SMS</li>}
            {notificationSettings.newsletter && <li>Newsletter</li>}
          </ul>
        </div>
      </div>

      {/* Privacy Settings Group */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Privacy Settings</h2>
        <div className="space-y-3 border border-gray-200 rounded-lg p-4 bg-gray-50">
          <Switch
            label="Public Profile"
            description="Make your profile visible to everyone"
            checked={privacySettings.publicProfile}
            onCheckedChange={(checked) =>
              setPrivacySettings({ ...privacySettings, publicProfile: checked })
            }
          />
          <Switch
            label="Show Email Address"
            description="Display your email on your profile"
            checked={privacySettings.showEmail}
            onCheckedChange={(checked) =>
              setPrivacySettings({ ...privacySettings, showEmail: checked })
            }
          />
          <Switch
            label="Show Phone Number"
            description="Display your phone number on your profile"
            checked={privacySettings.showPhone}
            onCheckedChange={(checked) =>
              setPrivacySettings({ ...privacySettings, showPhone: checked })
            }
          />
        </div>
      </div>

      {/* Compact Layout */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Compact Layout</h2>
        <div className="flex flex-wrap gap-6">
          <Switch label="Feature A" checked={true} onCheckedChange={() => {}} />
          <Switch label="Feature B" checked={false} onCheckedChange={() => {}} />
          <Switch label="Feature C" checked={true} onCheckedChange={() => {}} />
          <Switch label="Feature D" checked={false} onCheckedChange={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default SwitchExample;

