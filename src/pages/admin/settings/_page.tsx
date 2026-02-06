import { useState } from "react";
import { Button } from "@/components";
import { Card } from "@/components/ui/@raw-shadcn/card";
import PageWrapper from "@/components/ui/PageWrapper";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/@raw-shadcn/Label";
import { Textarea } from "@/components/ui/@raw-shadcn/textarea";
import { Switch } from "@/components/ui/@raw-shadcn/switch";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { useToast } from "@/components/ui/Toast/useToast";
import { Store, Truck, CreditCard, Mail, Receipt } from "lucide-react";

export default function SettingsPage() {
  const { success } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Store Information
  const [storeInfo, setStoreInfo] = useState({
    storeName: "My E-Commerce Store",
    storeEmail: "info@mystore.com",
    storePhone: "+63 912 345 6789",
    storeAddress: "123 Main Street, Manila, Philippines",
  });

  // Business Settings
  const [businessSettings, setBusinessSettings] = useState({
    currency: "PHP",
    taxRate: 12,
    lowStockAlert: true,
    lowStockThreshold: 10,
  });

  // Shipping Settings
  const [shippingSettings, setShippingSettings] = useState({
    jntApiKey: "",
    jntShipperId: "",
    defaultShippingFee: 150,
    freeShippingThreshold: 2000,
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    gcashMerchantId: "",
    gcashApiKey: "",
    gcashSandboxMode: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    emailProvider: "SendGrid",
    emailApiKey: "",
    orderConfirmationEmail: true,
    shippingNotificationEmail: true,
  });

  // POS Settings
  const [posSettings, setPosSettings] = useState({
    receiptHeader: "My E-Commerce Store\\nThank you for your purchase!",
    receiptFooter: "Visit us again soon!",
    autoOpenCashDrawer: true,
  });

  const handleSave = (section: string) => {
    setIsSaving(true);
    setTimeout(() => {
      success("Settings Saved", `${section} settings have been updated successfully`);
      setIsSaving(false);
    }, 1000);
  };

  const tabs: TabItem[] = [
    {
      value: "store",
      label: "Store Info",
      icon: <Store className="h-4 w-4" />,
      content: (
        <Card
          title="Store Information & Business Settings"
          description="Basic information about your store"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave("Store Information");
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="font-semibold">Store Information</h3>
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    type="text"
                    value={storeInfo.storeName}
                    onChange={(e) =>
                      setStoreInfo({ ...storeInfo, storeName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeInfo.storeEmail}
                    onChange={(e) =>
                      setStoreInfo({ ...storeInfo, storeEmail: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    type="tel"
                    value={storeInfo.storePhone}
                    onChange={(e) =>
                      setStoreInfo({ ...storeInfo, storePhone: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeAddress">Store Address</Label>
                  <Textarea
                    id="storeAddress"
                    rows={3}
                    value={storeInfo.storeAddress}
                    onChange={(e) =>
                      setStoreInfo({
                        ...storeInfo,
                        storeAddress: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold">Business Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input
                      id="currency"
                      type="text"
                      value={businessSettings.currency}
                      onChange={(e) =>
                        setBusinessSettings({
                          ...businessSettings,
                          currency: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRate">Tax Rate (%)</Label>
                    <Input
                      id="taxRate"
                      type="number"
                      value={businessSettings.taxRate}
                      onChange={(e) =>
                        setBusinessSettings({
                          ...businessSettings,
                          taxRate: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="lowStockAlert">Low Stock Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Get notified when products are running low
                    </p>
                  </div>
                  <Switch
                    id="lowStockAlert"
                    checked={businessSettings.lowStockAlert}
                    onCheckedChange={(checked) =>
                      setBusinessSettings({
                        ...businessSettings,
                        lowStockAlert: checked,
                      })
                    }
                  />
                </div>

                {businessSettings.lowStockAlert && (
                  <div className="space-y-2">
                    <Label htmlFor="lowStockThreshold">
                      Low Stock Threshold
                    </Label>
                    <Input
                      id="lowStockThreshold"
                      type="number"
                      value={businessSettings.lowStockThreshold}
                      onChange={(e) =>
                        setBusinessSettings({
                          ...businessSettings,
                          lowStockThreshold: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          }
        />
      ),
    },
    {
      value: "shipping",
      label: "Shipping",
      icon: <Truck className="h-4 w-4" />,
      content: (
        <Card
          title="Shipping Settings"
          description="Configure J&T Express shipping integration"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave("Shipping");
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="jntApiKey">J&T API Key</Label>
                <Input
                  id="jntApiKey"
                  type="password"
                  placeholder="Enter your J&T API key"
                  value={shippingSettings.jntApiKey}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      jntApiKey: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jntShipperId">J&T Shipper ID</Label>
                <Input
                  id="jntShipperId"
                  type="text"
                  placeholder="Enter your J&T Shipper ID"
                  value={shippingSettings.jntShipperId}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      jntShipperId: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="defaultShippingFee">
                  Default Shipping Fee (₱)
                </Label>
                <Input
                  id="defaultShippingFee"
                  type="number"
                  value={shippingSettings.defaultShippingFee}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      defaultShippingFee: parseFloat(e.target.value),
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="freeShippingThreshold">
                  Free Shipping Threshold (₱)
                </Label>
                <Input
                  id="freeShippingThreshold"
                  type="number"
                  value={shippingSettings.freeShippingThreshold}
                  onChange={(e) =>
                    setShippingSettings({
                      ...shippingSettings,
                      freeShippingThreshold: parseFloat(e.target.value),
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Orders above this amount will have free shipping
                </p>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          }
        />
      ),
    },
    {
      value: "payment",
      label: "Payment",
      icon: <CreditCard className="h-4 w-4" />,
      content: (
        <Card
          title="Payment Settings"
          description="Configure GCash payment integration"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave("Payment");
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="gcashMerchantId">GCash Merchant ID</Label>
                <Input
                  id="gcashMerchantId"
                  type="text"
                  placeholder="Enter your GCash Merchant ID"
                  value={paymentSettings.gcashMerchantId}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      gcashMerchantId: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gcashApiKey">GCash API Key</Label>
                <Input
                  id="gcashApiKey"
                  type="password"
                  placeholder="Enter your GCash API key"
                  value={paymentSettings.gcashApiKey}
                  onChange={(e) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      gcashApiKey: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="gcashSandboxMode">Sandbox Mode</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable for testing (no real transactions)
                  </p>
                </div>
                <Switch
                  id="gcashSandboxMode"
                  checked={paymentSettings.gcashSandboxMode}
                  onCheckedChange={(checked) =>
                    setPaymentSettings({
                      ...paymentSettings,
                      gcashSandboxMode: checked,
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          }
        />
      ),
    },
    {
      value: "email",
      label: "Email",
      icon: <Mail className="h-4 w-4" />,
      content: (
        <Card
          title="Email Settings"
          description="Configure email notifications"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave("Email");
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="emailProvider">Email Provider</Label>
                <Input
                  id="emailProvider"
                  type="text"
                  value={emailSettings.emailProvider}
                  onChange={(e) =>
                    setEmailSettings({
                      ...emailSettings,
                      emailProvider: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emailApiKey">Email API Key</Label>
                <Input
                  id="emailApiKey"
                  type="password"
                  placeholder="Enter your email API key"
                  value={emailSettings.emailApiKey}
                  onChange={(e) =>
                    setEmailSettings({
                      ...emailSettings,
                      emailApiKey: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold">Notification Settings</h3>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="orderConfirmationEmail">
                      Order Confirmation
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Send email when order is confirmed
                    </p>
                  </div>
                  <Switch
                    id="orderConfirmationEmail"
                    checked={emailSettings.orderConfirmationEmail}
                    onCheckedChange={(checked) =>
                      setEmailSettings({
                        ...emailSettings,
                        orderConfirmationEmail: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="shippingNotificationEmail">
                      Shipping Notification
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Send email when order is shipped
                    </p>
                  </div>
                  <Switch
                    id="shippingNotificationEmail"
                    checked={emailSettings.shippingNotificationEmail}
                    onCheckedChange={(checked) =>
                      setEmailSettings({
                        ...emailSettings,
                        shippingNotificationEmail: checked,
                      })
                    }
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          }
        />
      ),
    },
    {
      value: "pos",
      label: "POS",
      icon: <Receipt className="h-4 w-4" />,
      content: (
        <Card
          title="POS Settings"
          description="Configure Point of Sale settings"
          content={
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave("POS");
              }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="receiptHeader">Receipt Header</Label>
                <Textarea
                  id="receiptHeader"
                  rows={3}
                  value={posSettings.receiptHeader}
                  onChange={(e) =>
                    setPosSettings({
                      ...posSettings,
                      receiptHeader: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Text shown at the top of receipts
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiptFooter">Receipt Footer</Label>
                <Textarea
                  id="receiptFooter"
                  rows={2}
                  value={posSettings.receiptFooter}
                  onChange={(e) =>
                    setPosSettings({
                      ...posSettings,
                      receiptFooter: e.target.value,
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Text shown at the bottom of receipts
                </p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="autoOpenCashDrawer">
                    Auto Open Cash Drawer
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically open drawer after payment
                  </p>
                </div>
                <Switch
                  id="autoOpenCashDrawer"
                  checked={posSettings.autoOpenCashDrawer}
                  onCheckedChange={(checked) =>
                    setPosSettings({
                      ...posSettings,
                      autoOpenCashDrawer: checked,
                    })
                  }
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </Button>
            </form>
          }
        />
      ),
    },
  ];

  return (
    <PageWrapper
      title="Settings"
      description="Manage your store settings and configurations"
    >
      <Tabs items={tabs} defaultValue="store" />
    </PageWrapper>
  );
}
