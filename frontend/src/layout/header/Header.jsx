import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HoverCard, Group, Button, UnstyledButton, Text, SimpleGrid, ThemeIcon, Anchor, Divider, Center, Box, Burger, Drawer, Collapse, ScrollArea, Image } from '@mantine/core';
// import { MantineLogo } from '@mantinex/mantine-logo';
import { AiOutlineTransaction } from "react-icons/ai";

import { useDisclosure } from '@mantine/hooks';
import { IconNotification, IconCode, IconBook, IconChartPie3, IconFingerprint, IconCoin, IconChevronDown } from '@tabler/icons-react';
import classes from './HeaderMegaMenu.module.css';

const mockdata = [
  {
    icon: IconCode,
    title: 'Open source',
    description: 'This Pokémon’s cry is very loud and distracting',
  },
  {
    icon: IconCoin,
    title: 'Free for everyone',
    description: 'The fluid of Smeargle’s tail secretions changes',
  },
  {
    icon: IconBook,
    title: 'Documentation',
    description: 'Yanma is capable of seeing 360 degrees without',
  },
  {
    icon: IconFingerprint,
    title: 'Security',
    description: 'The shell’s rounded shape and the grooves on its.',
  },
  {
    icon: IconChartPie3,
    title: 'Analytics',
    description: 'This Pokémon uses its flying ability to quickly chase',
  },
  {
    icon: IconNotification,
    title: 'Notifications',
    description: 'Combusken battles with the intensely hot flames it spews',
  },
];

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const location = useLocation();
  const hideButtons = location.pathname === '/signup' || location.pathname === '/signin';
  const [isOpen, setIsOpen] = useState(false);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const navigate = useNavigate()

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon style={{ width: 22, height: 22 }} />
        </ThemeIcon>
        <div>
          <Text size="sm" weight={500}>
            {item.title}
          </Text>
          <Text size="xs" color="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));


  return (
    <>
      <Box>
        <header
          className={`${classes.header} p-4 border-b-slate-200 ${isSticky ? 'shadow-lg sticky-header' : ''
            }`}
          style={{
            position: 'sticky !important',
            top: 0,
            zIndex: 10,
            backgroundColor: 'white',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <Group justify="space-between" h="100%">
            <Image src="../../assets/images/lgo-red.png" className="h-10" alt="logo" />

            <Group h="100%" gap={0} visibleFrom="sm">
              <a href="#" className={classes.link}>
                Home
              </a>
              <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                <HoverCard.Target>
                  <a href="#" className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
                        Features
                      </Box>
                      <IconChevronDown style={{ width: 16, height: 16 }} />
                    </Center>
                  </a>
                </HoverCard.Target>
                <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                  <Group justify="space-between" px="md">
                    <Text weight={500}>Features</Text>
                    <Anchor href="#" size="xs">
                      View all
                    </Anchor>
                  </Group>
                  <Divider my="sm" />
                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>
                  <div className={classes.dropdownFooter}>
                    <Group justify="space-between">
                      <div>
                        <Text weight={500} size="sm">
                          Get started
                        </Text>
                        <Text size="xs" color="dimmed">
                          Their food sources have decreased, and their numbers
                        </Text>
                      </div>
                      <Button variant="default">Get started</Button>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <a href="#" className={classes.link}>
                About
              </a>
              <a href="#" className={classes.link}>
                Contact Us
              </a>
            </Group>

            <Group visibleFrom="sm">
              <Button onClick={() => navigate('/signin')} variant="default">
                Log in
              </Button>
              <Button>Sign up</Button>
            </Group>

            <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
          </Group>
        </header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - 80px)`} mx="-md">
            <Divider my="sm" />

            <a href="#" className={classes.link}>
              Home
            </a>
            <UnstyledButton className={classes.link} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Features
                </Box>
                <IconChevronDown style={{ width: 16, height: 16 }} />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a>

            <Divider my="sm" />

            <Group justify="center" grow pb="xl" px="md">
              <Button onClick={() => navigate('/signin')} variant="default">
                Log in
              </Button>
              <Button>Sign up</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </Box>


    </>

  )
}

export default Header