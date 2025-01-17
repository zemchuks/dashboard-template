import React from "react";
import { Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, Box, Stack } from "@mantine/core";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons-react";
import "./styles.css";
import bg from "./bg.svg";

const MOCKDATA = [
    { title: "Email", description: "info@techxperience.ng", icon: IconAt },
    { title: "Phone", description: "+234 913 444 8800", icon: IconPhone },
    { title: "Address", description: "844 Morris Park avenue", icon: IconMapPin },
    { title: "Working hours", description: "8 a.m. – 11 p.m.", icon: IconSun },
];

function ContactIcon({ icon: Icon, title, description }) {
    return (
        <div className="contactItem">
            <Box mr="md">
                <Icon style={{ width: "24px", height: "24px" }} />
            </Box>
            <div>
                <Text size="xs" className="contactTitle">
                    {title}
                </Text>
                <Text className="contactDescription">{description}</Text>
            </div>
        </div>
    );
}

function ContactIconsList() {
    return (
        <Stack>
            {MOCKDATA.map((item, index) => (
                <ContactIcon key={index} {...item} />
            ))}
        </Stack>
    );
}

export default function GetInTouch() {
    return (
        <div className="md:my-10">

            {/* `<div className="text-center">
                <h2 className="text-3xl font-bold sm:text-4xl">Contact Us</h2>
            </div>` */}
            <div className="wrapper mt-10 p-2 md:max-w-4xl md:mx-auto shadow-lg">
                <div className="contacts" style={{ backgroundImage: `url(${bg})` }}>
                    <Text fz="lg" fw={700} className="title" style={{ color: "#fff" }}>
                        Contact information
                    </Text>
                    <ContactIconsList />
                </div>
                <form className="form" onSubmit={(event) => event.preventDefault()}>
                    <div fz="lg" fw={700} className="title text-xl font-extrabold">
                        Get in touch
                    </div>
                    <div className="fields">
                        <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: "768px", cols: 1 }]}>
                            <TextInput label="Your name" placeholder="Your name" />
                            <TextInput label="Your email" placeholder="hello@mantine.dev" required />
                        </SimpleGrid>
                        <TextInput mt="md" label="Subject" placeholder="Subject" required />
                        <Textarea
                            mt="md"
                            label="Your message"
                            placeholder="Please include all relevant information"
                            minRows={3}
                        />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit" className="control">
                                Send message
                            </Button>
                        </Group>
                    </div>
                </form>
            </div>
        </div>
    );
}
