import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../button";
import { Input } from "../Input";
import { Label } from "../@raw-shadcn/Label";
import { Textarea } from "../@raw-shadcn/textarea";
import { Card } from "../@raw-shadcn/card";
import { useToast } from "../Toast/useToast";

export const ModalExample = () => {
  const { success, error, info } = useToast();
  const [name, setName] = useState("Pedro Duarte");
  const [username, setUsername] = useState("@peduarte");
  const [email, setEmail] = useState("pedro@example.com");
  const [bio, setBio] = useState("I love building web applications!");

  const handleSaveProfile = (close: () => void) => {
    success("Profile Updated", "Your profile has been saved successfully.");
    close();
  };

  const handleDeleteAccount = (close: () => void) => {
    error("Account Deleted", "Your account has been permanently deleted.");
    close();
  };

  const handleSubscribe = (close: () => void) => {
    info("Subscribed", "You have been subscribed to our newsletter.");
    close();
  };

  return (
    <div className="space-y-6">
      {/* Basic Modal */}
      <Card
        title="Basic Modal"
        description="A simple modal with title, description, and content"
        content={
          <Modal
            trigger={<Button variant="outline">Open Basic Modal</Button>}
            title="Modal Title"
            description="This is a basic modal with some content."
            showFooter={false}
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This is a simple modal without any action buttons. You can close
                it by clicking the X button or clicking outside the modal.
              </p>
            </div>
          </Modal>
        }
      />

      {/* Profile Edit Modal */}
      <Card
        title="Edit Profile Modal"
        description="Modal with form inputs and save action"
        content={
          <Modal
            trigger={<Button variant="primary">Edit Profile</Button>}
            title="Edit Profile"
            description="Make changes to your profile here. Click save when you're done."
            onPrimaryAction={handleSaveProfile}
            onSecondaryAction={(close) => close()}
            primaryActionText="Save Changes"
            secondaryActionText="Cancel"
            primaryActionVariant="primary"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself"
                  rows={3}
                />
              </div>
            </div>
          </Modal>
        }
      />

      {/* Confirmation Modal */}
      <Card
        title="Confirmation Modal"
        description="Modal with destructive action (danger variant)"
        content={
          <Modal
            trigger={<Button variant="danger">Delete Account</Button>}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            onPrimaryAction={handleDeleteAccount}
            onSecondaryAction={(close) => close()}
            primaryActionText="Yes, delete account"
            secondaryActionText="Cancel"
            primaryActionVariant="danger"
            maxWidth="md"
          >
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-800">
                  ⚠️ Warning: This action is irreversible. All your data will be
                  permanently lost.
                </p>
              </div>
            </div>
          </Modal>
        }
      />

      {/* Success Action Modal */}
      <Card
        title="Success Action Modal"
        description="Modal with success variant primary button"
        content={
          <Modal
            trigger={<Button variant="success">Subscribe</Button>}
            title="Subscribe to Newsletter"
            description="Get the latest updates delivered to your inbox."
            onPrimaryAction={handleSubscribe}
            onSecondaryAction={(close) => close()}
            primaryActionText="Subscribe"
            secondaryActionText="Maybe Later"
            primaryActionVariant="success"
            maxWidth="sm"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subscribe-email">Email Address</Label>
                <Input
                  id="subscribe-email"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <p className="text-xs text-gray-500">
                We'll never share your email with anyone else.
              </p>
            </div>
          </Modal>
        }
      />

      {/* Without Close Button */}
      <Card
        title="Modal Without Close Button"
        description="Modal without X button - must use action buttons"
        content={
          <Modal
            trigger={<Button variant="info">Open (No X)</Button>}
            title="Complete This Action"
            description="You must choose an option to close this modal."
            showCloseButton={false}
            onPrimaryAction={(close) => {
              info("Action Completed", "You selected continue.");
              close();
            }}
            onSecondaryAction={(close) => {
              info("Action Cancelled", "You selected go back.");
              close();
            }}
            primaryActionText="Continue"
            secondaryActionText="Go Back"
            primaryActionVariant="primary"
          >
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                This modal doesn't have a close button (X). You must use one of
                the action buttons below to close it.
              </p>
            </div>
          </Modal>
        }
      />

      {/* Different Sizes */}
      <Card
        title="Different Modal Sizes"
        description="Modals with different maximum widths"
        content={
          <div className="flex flex-wrap gap-3">
            <Modal
              trigger={
                <Button variant="outline" size="sm">
                  Small
                </Button>
              }
              title="Small Modal"
              description="This is a small modal (max-w-sm)"
              maxWidth="sm"
              showFooter={false}
            >
              <p className="text-sm text-gray-600">Small modal content</p>
            </Modal>

            <Modal
              trigger={
                <Button variant="outline" size="sm">
                  Medium
                </Button>
              }
              title="Medium Modal"
              description="This is a medium modal (max-w-md)"
              maxWidth="md"
              showFooter={false}
            >
              <p className="text-sm text-gray-600">Medium modal content</p>
            </Modal>

            <Modal
              trigger={
                <Button variant="outline" size="sm">
                  Large
                </Button>
              }
              title="Large Modal"
              description="This is a large modal (max-w-lg)"
              maxWidth="lg"
              showFooter={false}
            >
              <p className="text-sm text-gray-600">Large modal content</p>
            </Modal>

            <Modal
              trigger={
                <Button variant="outline" size="sm">
                  Extra Large
                </Button>
              }
              title="Extra Large Modal"
              description="This is an extra large modal (max-w-xl)"
              maxWidth="xl"
              showFooter={false}
            >
              <p className="text-sm text-gray-600">Extra large modal content</p>
            </Modal>

            <Modal
              trigger={
                <Button variant="outline" size="sm">
                  2XL
                </Button>
              }
              title="2XL Modal"
              description="This is a 2XL modal (max-w-2xl)"
              maxWidth="2xl"
              showFooter={false}
            >
              <p className="text-sm text-gray-600">
                2XL modal content with more space for complex layouts
              </p>
            </Modal>
          </div>
        }
      />

      {/* Controlled Modal Example */}
      <Card
        title="Controlled Modal"
        description="Modal with controlled open state"
        content={<ControlledModalExample />}
      />

      {/* Modal with Close Function in Children */}
      <Card
        title="Modal with Close Function"
        description="Access close function directly in children"
        content={<ModalWithCloseFunctionExample />}
      />

      {/* Modal with onOpen Callback */}
      <Card
        title="Modal with onOpen Callback"
        description="Get close function when modal opens"
        content={<ModalWithOnOpenExample />}
      />
    </div>
  );
};

// Controlled Modal Example Component
const ControlledModalExample = () => {
  const [open, setOpen] = useState(false);
  const { success } = useToast();

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <Button variant="primary" onClick={() => setOpen(true)}>
          Open Controlled Modal
        </Button>
        <Button
          variant="outline"
          onClick={() => setOpen(false)}
          disabled={!open}
        >
          Close from Outside
        </Button>
      </div>

      <p className="text-sm text-gray-600">
        Modal is currently: <strong>{open ? "Open" : "Closed"}</strong>
      </p>

      <Modal
        trigger={<span />}
        title="Controlled Modal"
        description="This modal's state is controlled from outside"
        open={open}
        onOpenChange={setOpen}
        onPrimaryAction={(close) => {
          success("Action Completed", "Modal closed via primary action");
          close();
        }}
        onSecondaryAction={(close) => close()}
        primaryActionText="Confirm"
        secondaryActionText="Cancel"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            This modal is controlled by a parent component's state. You can open
            and close it from outside the modal itself.
          </p>
        </div>
      </Modal>
    </div>
  );
};

// Modal with Close Function in Children Example
const ModalWithCloseFunctionExample = () => {
  const { success } = useToast();

  return (
    <Modal
      trigger={
        <Button variant="primary">Open Modal with Close Function</Button>
      }
      title="Custom Close Buttons"
      description="Use the close function anywhere in your content"
      showFooter={false}
    >
      {(close) => (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            You can access the close function directly in your content and call
            it from anywhere, like custom buttons or after form submission.
          </p>

          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={() => {
                success("Saved!", "Changes saved successfully");
                close();
              }}
            >
              Save and Close
            </Button>

            <Button variant="outline" onClick={close}>
              Just Close
            </Button>
          </div>

          <div className="border-t pt-4 mt-4">
            <p className="text-xs text-gray-500 mb-2">
              You can also close after async operations:
            </p>
            <Button
              variant="success"
              size="sm"
              onClick={async () => {
                // Simulate API call
                await new Promise((resolve) => setTimeout(resolve, 1000));
                success("Done!", "Async operation completed");
                close();
              }}
            >
              Async Save and Close
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};

// Modal with onOpen Callback Example
const ModalWithOnOpenExample = () => {
  const [closeFunction, setCloseFunction] = useState<(() => void) | null>(null);
  const { info } = useToast();

  return (
    <div className="space-y-4">
      <Modal
        trigger={<Button variant="info">Open Modal (onOpen Example)</Button>}
        title="Modal with onOpen Callback"
        description="The close function is captured via onOpen callback"
        onOpen={(close) => {
          setCloseFunction(() => close);
          info("Modal Opened", "Close function is now available outside");
        }}
        showFooter={false}
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            The{" "}
            <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">
              onOpen
            </code>{" "}
            callback gives you access to the close function when the modal
            opens. This is useful when you need to control the modal from
            outside its content.
          </p>
        </div>
      </Modal>

      {closeFunction && (
        <Button
          variant="outline"
          onClick={() => {
            closeFunction();
            setCloseFunction(null);
          }}
        >
          Close Modal from Outside (via onOpen)
        </Button>
      )}
    </div>
  );
};
