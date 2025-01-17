import { Accordion, Container, Grid, Image, Title } from '@mantine/core';
// import image from './image.svg';
import classes from './FaqWithImage.module.css';

const placeholder =
    'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.';

export function FaqWithImage() {
    return (
        <div className='mt-20 mb-20 md:my-36'>
            <Container size="lg">
                <Grid id="faq-grid" className='flex flex-col justify-between gap-8 md:flex-row' gutter={50}>


                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Image src='../../assets/faq.svg' alt="Frequently Asked Questions" />
                    </Grid.Col>


                    <Grid.Col span={{ base: 12, md: 6 }}>
                        <Title order={2} ta="left" className={`${classes.title} mb-5`}>
                            Frequently Asked Questions
                        </Title>

                        <Accordion chevronPosition="right" defaultValue="reset-password" variant="separated">
                            <Accordion.Item className={classes.item} value="reset-password">
                                <Accordion.Control>How can I reset my password?</Accordion.Control>
                                <Accordion.Panel>On the login screen, click on the <strong>Forgot password</strong> link. This will provide you with a field to input your email and send you an otp to reset your password.</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="another-account">
                                <Accordion.Control>How do i create an account?</Accordion.Control>
                                <Accordion.Panel>To start using the platform, you will have to be added by an organisation which could be a bank or any financial entity</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="newsletter">
                                <Accordion.Control>How can I subscribe to monthly newsletter?</Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>

                            <Accordion.Item className={classes.item} value="credit-card">
                                <Accordion.Control>
                                    Do you store credit card information securely?
                                </Accordion.Control>
                                <Accordion.Panel>{placeholder}</Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
                    </Grid.Col>
                </Grid>
            </Container>
        </div>
    );
}