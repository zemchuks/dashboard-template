import { Modal, TextInput, PasswordInput, Checkbox, Button, Group } from '@mantine/core';

const DemoModal = ({ isOpen, onClose }) => {

  return (
    <>
      <Modal opened={isOpen} onClose={onClose} size="lg" title="Add a key party" centered>
        <form className='p-3'>
          <Group grow mb="md">
            <TextInput label="First name" placeholder="Your first name" required />
            <TextInput label="Last name" placeholder="Your last name" required />
          </Group>

          <TextInput label="Email" placeholder="Your email" required mb="md" />
          <Group grow mb="md">
            <PasswordInput label="Password" placeholder="Password" required mb="md" />
            <PasswordInput label="Confirm Password" placeholder="Confirm password" required mb="md" />
          </Group>


          <Checkbox label="I agree to the terms and conditions" required mb="md" />

          <Button fullWidth type="submit">Register</Button>
        </form>
      </Modal>

    </>
  );
}

export default DemoModal