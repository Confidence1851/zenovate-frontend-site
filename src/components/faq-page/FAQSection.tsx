'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Category {
    id: number;
    name: string;
}

interface AccordionItem {
    categoryId: number;
    heading: string;
    description: string;
    list?: string[];
}

export const faqAccordionCategories: Category[] = [
    {
        id: 1,
        name: "Subcutaneous Injections"
    },
    {
        id: 2,
        name: "Product Information and Selection"
    },
    {
        id: 3,
        name: "Safe Usage and Administration"
    },
    {
        id: 4,
        name: "Managing Treatment"
    },
    {
        id: 5,
        name: "Customer Support and Emergencies"
    }
];

export const faqAccordionData: AccordionItem[] = [
    {
        categoryId: 1,
        heading: 'What are subcutaneous injections?',
        description:
            'Subcutaneous injections involve administering medication under the skin but above the muscle, allowing for slow and steady absorption into the bloodstream. They are commonly used for medications that need to be absorbed gradually.'
    },
    {
        categoryId: 3,
        heading: 'Are your subcutaneous injections safe to use at home?',
        description:
            "Yes, our products are designed specifically for safe and easy use at home. Each product comes with detailed instructions, and we recommend that you consult with your healthcare provider before starting any new treatment. Additionally, we provide online tutorials and customer support to guide you through the process."
    },
    {
        categoryId: 2,
        heading: "How do I know which product is right for me?",
        description:
            "The choice of product depends on your specific health needs. We encourage you to discuss with your healthcare provider to determine the most suitable product for your condition. Each of our product pages also includes comprehensive information to help you make an informed decision."
    },
    {
        categoryId: 3,
        heading: 'How do I administer a subcutaneous injection?',
        description:
            "Each product includes detailed instructions on how to prepare and administer the injection. We also offer video tutorials and customer support to help you feel confident in performing the injection. Remember to always follow proper hygiene practices, such as washing your hands and cleaning the injection site before administering."
    },
    {
        categoryId: 2,
        heading: 'Do I need a prescription to purchase your products?',
        description:
            "Yes, most of our subcutaneous injection products require a prescription. This ensures that the product is suitable for your specific condition and that you are using it under the guidance of a healthcare professional."
    },
    {
        categoryId: 1,
        heading: 'What are the common areas for subcutaneous injections?',
        description:
            'The most common areas for subcutaneous injections are the abdomen, thigh, and upper arm. Each product may have specific recommendations for the best injection site, which will be provided in the instructions.'
    },
    {
        categoryId: 3,
        heading: 'How should I store my injection products?',
        description:
            'Storage requirements vary depending on the product. Generally, most subcutaneous injection products should be stored in a cool, dry place away from direct sunlight. Some products may require refrigeration. Detailed storage instructions are provided with each product.'
    },
    {
        categoryId: 1,
        heading: 'How should I store my injection products?',
        description:
            'Storage requirements vary depending on the product. Generally, most subcutaneous injection products should be stored in a cool, dry place away from direct sunlight. Some products may require refrigeration. Detailed storage instructions are provided with each product.'
    },
    {
        categoryId: 4,
        heading: 'What should I do if I experience side effects?',
        description:
            'If you experience any unusual or severe side effects, stop using the product and contact your healthcare provider immediately. Side effects may include redness, swelling, or pain at the injection site, as well as more serious reactions depending on the medication. Our customer support team is also available to assist with any concerns.'
    },
    {
        categoryId: 3,
        heading: 'Can I reuse needles or syringes?',
        description:
            'No, needles and syringes are designed for single use only. Reusing them can increase the risk of infection and reduce the effectiveness of the medication. Always use a new needle and syringe for each injection.'
    },
    {
        categoryId: 4,
        heading: 'What should I do if I miss a dose?',
        description:
            'If you miss a dose, follow the instructions provided with your specific medication or contact your healthcare provider for guidance. Do not double up on doses unless directed by a healthcare professional.'
    },
    {
        categoryId: 4,
        heading: 'Can I travel with my injection products?',
        description:
            'Yes, you can travel with your injection products. We recommend keeping them in their original packaging, along with any documentation from your healthcare provider. If refrigeration is required, use a cooler bag or insulated container to maintain the correct temperature.'
    },
    {
        categoryId: 5,
        heading: 'Do you offer customer support for your products?',
        description:
            'Absolutely! Our customer support team is available to answer any questions and provide guidance on using our products. You can reach us via phone, email, or live chat on our website.'
    },
    {
        categoryId: 2,
        heading: 'What is the typical duration of treatment with your products?',
        description:
            'The duration of treatment varies depending on the specific medication and the condition being treated. Some treatments may be short-term, while others require long-term or ongoing administration. It is essential to follow the treatment plan prescribed by your healthcare provider and consult them regularly to monitor your progress and make any necessary adjustments.'
    },
    {
        categoryId: 4,
        heading: "What blood tests should I undergo before starting treatment?",
        description:
            "The required blood tests depend on the specific medication and your individual health status. Before starting any new treatment, your healthcare provider may recommend blood tests to assess factors such as liver and kidney function, blood cell counts, hormone levels, or other relevant health indicators. These tests help ensure that the treatment is safe and appropriate for you and allow for monitoring of your response to the medication over time."
    },
    {
        categoryId: 1,
        heading: "What are the potential benefits of using subcutaneous injections at home?",
        description:
            "Using subcutaneous injections at home offers several benefits, including:",
        list: [
            "Convenience: You can administer treatments on your schedule without the need for frequent clinic visits.",
            "Comfort: Being in a familiar environment may reduce anxiety and make the process more comfortable.",
            "Efficiency: Home administration can save time and reduce healthcare costs associated with clinic appointments.",
            "Timely Treatment: It allows for prompt administration of medication, which can be crucial for managing certain health conditions effectively.",
            "Empowerment: Learning to manage your treatment can increase your sense of control and participation in your healthcare journey. Always ensure that you are properly trained and confident in administering injections at home, and consult your healthcare provider with any concerns."
        ]
    },
    {
        categoryId: 3,
        heading: "Are there any precautions I should take before starting treatment?",
        description:
            "Yes, before starting any new treatment, you should:",
        list: [
            "Consult Your Healthcare Provider: Discuss your full medical history, current medications, and any allergies to ensure the treatment is appropriate for you.",
            "Understand the Medication: Learn about the purpose, dosage, administration technique, and potential side effects of the medication.",
            "Proper Training: Ensure you receive adequate training on how to prepare and administer the injection safely.",
            "Gather Necessary Supplies: Have all necessary supplies on hand, including needles, syringes, alcohol swabs, and a proper disposal container for used sharps.",
            "Plan for Monitoring: Understand how your treatment will be monitored and schedule follow-up appointments or tests as recommended by your healthcare provider."
        ]
    },
    {
        categoryId: 3,
        heading: "What should I do if I experience discomfort during the injection?",
        description:
            "If you experience discomfort during the injection:",
        list: [
            "Pause the Injection: Stop and assess the situation; ensure you are following the correct technique.",
            "Check the Injection Site: Make sure the site is appropriate and prepared correctly.",
            "Adjust Technique: Slight adjustments in angle or speed may reduce discomfort.",
            "Use Numbing Techniques: Applying a cold pack to the area before injection can help numb the site and reduce pain.",
            "Consult Healthcare Provider: If discomfort persists, discuss it with your healthcare provider for additional guidance or alternative options."
        ]
    },
    {
        categoryId: 2,
        heading: "Can I combine different medications in one injection?",
        description:
            "You should never combine different medications in one injection unless explicitly instructed by your healthcare provider. Mixing medications can lead to adverse reactions or reduce the effectiveness of the treatments. Always follow the administration instructions provided with each specific medication."
    },
    {
        categoryId: 4,
        heading: "Are there any lifestyle changes I should consider while undergoing treatment?",
        description:
            "Depending on the medication and condition being treated, your healthcare provider may recommend certain lifestyle changes to enhance treatment effectiveness, such as:",
        list: [
            "Dietary Adjustments: Eating a balanced diet or avoiding specific foods.",
            "Exercise: Incorporating appropriate levels of physical activity.",
            "Avoiding Alcohol or Tobacco: As these can interfere with certain medications.",
            "Stress Management: Practicing relaxation techniques to support overall well-being. Always discuss any recommended lifestyle changes with your healthcare provider to ensure they are safe and appropriate for your situation."
        ]
    },
    {
        categoryId: 3,
        heading: "How do I handle and dispose of expired or unused medications?",
        description:
            "Expired or unused medications should be disposed of properly to prevent accidental use or environmental harm. You can:",
        list: [
            "Return to Us: We offer take-back programs for safe disposal.",
            "Community Take-Back Programs: Participate in local medication disposal events or programs.",
            "Follow Local Guidelines: Adhere to local regulations regarding medication disposal. Do not throw medications in the regular trash or flush them down the toilet unless instructed."
        ]
    },
    {
        categoryId: 5,
        heading: "What if I have a medical emergency related to the injection?",
        description:
            "In case of a medical emergency, such as a severe allergic reaction (anaphylaxis), difficulty breathing, or loss of consciousness:",
        list: [
            "Call Emergency Services: Dial your local emergency number immediately.",
            "Follow Emergency Protocols: Use any prescribed emergency medications (e.g., epinephrine auto-injector) as directed.",
            "Inform Healthcare Providers: Provide details about the medication administered and any relevant medical history. Always have emergency contact information readily available when administering injections at home."
        ]
    },
];


const FAQSection = () => {

    return (
        <>
            <div className="xmd-container">
                {faqAccordionCategories.map((category) => (
                    <div key={category.id} className="mb-12">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Category Title - Takes 1/3 width on desktop */}
                            <div className="w-full md:w-1/4">
                                <h2 className="uppercase text-xl font-bold sticky top-24">
                                    {category.name}
                                </h2>
                            </div>

                            {/* FAQs - Takes 2/3 width on desktop */}
                            <div className="w-full md:w-3/4">
                                <Accordion type="multiple" className="gap-5 flex flex-col w-full">
                                    {faqAccordionData
                                        .filter(item => item.categoryId === category.id)
                                        .map((item, i) => (
                                            <AccordionItem
                                                value={item.heading}
                                                className="border-b pb-4"
                                                key={i}
                                            >
                                                <AccordionTrigger className="uppercase hover:no-underline text-left transition-colors duration-300 text-[14px] md:text-base px-4 font-semibold border-b-0 data-[state=open]:no-underline">
                                                    {item.heading}
                                                </AccordionTrigger>
                                                <AccordionContent className="p-4 leading-4 md:leading-6 text-base md:text-md py-5">
                                                    <p>{item.description}</p>
                                                    {item.list && (
                                                        <ul className="flex flex-col gap-1.5 pl-0 ml-[1.0625rem] mt-2">
                                                            {item.list.map((item, i) => (
                                                                <li className="list-decimal" key={i}>
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </AccordionContent>
                                            </AccordionItem>
                                        ))}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default FAQSection;