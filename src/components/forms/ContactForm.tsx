"use client";

import FormInputText from "@/components/common/FormInputText";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight } from "iconsax-react";
import { contactSchema } from "@/schemas/formSchema";
import FormTextArea from "../common/FormTextArea";

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    mode: "all",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const onSubmit = async () => {
    console.log("submitted");
  };
  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-11 py-4 max-w-[1200px]"
        >
          <div className="grid lg:grid-cols-2 gap-6">
            <FormInputText
              name="fullname"
              label="full name"
              placeholder="email@domain.com"
              control={control}
              errors={errors}
            />
            <FormInputText
              name="email"
              label="Email address"
              placeholder="email@domain.com"
              control={control}
              errors={errors}
            />
            <FormInputText
              name="phone"
              label="Phone"
              placeholder="+1 234 567 890"
              control={control}
              errors={errors}
            />
            <FormInputText
              name="subject"
              label="subject"
              placeholder="I have an enquiry"
              control={control}
              errors={errors}
            />
            <div className="col-span-2">
              <FormTextArea
                rows={5}
                name="message"
                label="message"
                placeholder="your message goes here...."
                control={control}
                errors={errors}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-Black-100 text-White-100 h-11 flex justify-between items-center p-4 max-w-[250px]"
          >
            <span className="uppercase">send message</span>
            <ArrowRight size="24" className="text-secondary-foreground" />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
