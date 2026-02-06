import { z } from "zod";
import { useState } from "react";
import FormWrapper from "./FormWrapper/FormWrapper";
import { useTypedFormFields } from "./FormWrapper/useTypedFormFields";
import { Button, useToast } from "../ui";

const employeeFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  department: z.object({
    value: z.string(),
    label: z.string(),
  }),
  employmentType: z.enum(["fulltime", "parttime", "contract"], {
    required_error: "Please select an employment type",
  }),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
  phoneNumber: z.string().optional(),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  emailNotifications: z.boolean().default(false),
  salary: z.number().min(0, "Salary must be positive").optional(),
  employeeId: z.string().optional(),
  startDate: z.date({
    required_error: "Please select a start date",
  }),
});

type EmployeeFormData = z.infer<typeof employeeFormSchema>;

const EmployeeFormFields = () => {
  const {
    FormInput,
    FormSelect,
    FormCheckbox,
    FormRadioGroup,
    FormTextarea,
    FormNumberInput,
    FormDatePicker,
  } = useTypedFormFields<EmployeeFormData>();

  const departmentOptions = [
    { value: "engineering", label: "Engineering" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
  ];

  const employmentOptions = [
    {
      value: "fulltime",
      label: "Full-time",
      description: "40+ hours per week with full benefits",
    },
    {
      value: "parttime",
      label: "Part-time",
      description: "Less than 40 hours per week",
    },
    {
      value: "contract",
      label: "Contract",
      description: "Project-based work with flexible schedule",
    },
  ];

  return (
    <>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            name="firstName"
            label="First Name"
            placeholder="Enter first name"
          />
          <FormInput
            name="lastName"
            label="Last Name"
            placeholder="Enter last name"
          />
        </div>
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number (Optional)"
          type="tel"
          placeholder="Enter phone number"
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Employment Information
        </h2>
        <FormSelect
          name="department"
          label="Department"
          placeholder="Select a department..."
          options={departmentOptions}
          returnFullObject={true}
        />
        <FormRadioGroup
          name="employmentType"
          label="Employment Type"
          options={employmentOptions}
          orientation="vertical"
        />
        <FormDatePicker
          name="startDate"
          label="Start Date"
          placeholder="Select start date"
          minDate={new Date()}
          showClear={true}
        />
        <FormNumberInput
          name="salary"
          label="Annual Salary (Optional)"
          placeholder="Enter salary"
          thousandSeperator={true}
          allowLeadingZero={false}
        />
        <FormNumberInput
          name="employeeId"
          label="Employee ID (Optional)"
          placeholder="Enter employee ID"
          allowLeadingZero={true}
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Additional Information
        </h2>
        <FormTextarea
          name="bio"
          label="Bio (Optional)"
          placeholder="Tell us about yourself..."
          rows={4}
          maxLength={500}
          showCharCount={true}
        />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Preferences & Terms
        </h2>
        <FormCheckbox
          name="emailNotifications"
          label="Email Notifications"
          description="Receive updates and notifications via email"
        />
        <FormCheckbox
          name="acceptTerms"
          label="I accept the terms and conditions"
          description="You must accept our terms and conditions to proceed"
        />
      </div>

      <div className="flex justify-end pt-6 border-t border-gray-200">
        <Button type="submit" className="px-8 py-2">
          Save Employee
        </Button>
      </div>
    </>
  );
};

export const ComprehensiveFormExample = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { success, error } = useToast();

  const handleSubmit = async (data: EmployeeFormData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", data);
      success("Success!", "Employee information saved successfully!");
    } catch (_submitError) {
      error("Error", "Failed to save employee information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Employee Registration
        </h1>
        <p className="text-gray-600">
          Complete the form below to register a new employee in the system.
        </p>
      </div>

      <FormWrapper
        schema={employeeFormSchema}
        defaultValues={{
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          department: { value: "engineering", label: "Engineering" },
          employmentType: "fulltime",
          startDate: new Date(new Date().setDate(new Date().getDate() + 7)), // Default to 1 week from now
          acceptTerms: true,
          phoneNumber: "1234567890",
          bio: "John Doe is a software engineer at Google.",
          emailNotifications: true,
          salary: 75000,
          employeeId: "00123",
        }}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        resetOnSubmit={false}
        className="space-y-6"
      >
        <EmployeeFormFields />
      </FormWrapper>
    </div>
  );
};
