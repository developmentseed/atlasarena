import React from 'react';
import {
  Container,
  Box,
  Text,
  Card,
  CardHeader,
  SimpleGrid,
  Flex,
} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import InnerHeading from '../custom/InnerHeading';
import { Link as NextLink } from '@chakra-ui/next-js';

const CustomCard = ({ title = '', subTitle = '', href = '' }) => {
  return (
    <Card variant='withImageHeader' size='md'>
      <CardHeader>
        <Box
          position='absolute'
          bottom='0'
          display='flex'
          flexDirection='column'
          justifyContent='flex-end'
          alignItems='start'
          color='white'
          p={2}
        >
          <NextLink
            fontSize='md'
            href={`/explore`}
            color='blue.900'
            fontWeight={700}
          >
            {title}
          </NextLink>
          <Text fontSize='md' color='blue.900'>
            {subTitle}
          </Text>
        </Box>
      </CardHeader>
    </Card>
  );
};

const OverlayComponent = ({
  kicker = '',
  title = '',
  subTitle = '',
  contentHtml = '',
  virus = [],
  species = [],
}) => {
  const renderViruses = virus.map((item) => (
    <CustomCard
      key={item.name}
      title={item.name}
      subTitle={`${(item.species || []).length}  reservoir species`}
    />
  ));
  const renderSpecies = species.map((item) => (
    <CustomCard key={item.name} title={item.name} subTitle={item.virus} />
  ));

  return (
    <Box
      position='absolute'
      top={0}
      left={0}
      right={0}
      w='100vw'
      minH={{ base: '100vh', md: 'auto' }}
      maxH={{ base: '100vh', md: 'auto' }}
      zIndex={2}
      display='flex'
      flexDirection='column'
      justifyContent='start'
      overflowY='auto'
      pt={{ base: 4, md: 8, lg: 12 }}
      pb={{ base: 4, md: 8, lg: 12 }}
    >
      <Container px={2} py={2} maxW='960px'>
        <InnerHeading
          kicker={kicker}
          title={title}
          subTitle={subTitle}
          contentHtml={contentHtml}
        />
      </Container>
      <Container textAlign='start' px={0} py={4} maxW='960px'>
        <Tabs variant='unstyled'>
          <TabList justifyContent='center'>
            <Tab>VIRUSES</Tab>
            <Tab>RESERVOIRS</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
                spacing={4}
                px={0}
              >
                {renderViruses}
              </SimpleGrid>
            </TabPanel>
            <TabPanel>
              <SimpleGrid
                columns={{ base: 1, sm: 2, md: 3, lg: 3 }}
                spacing={4}
                px={0}
              >
                {renderSpecies}
              </SimpleGrid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
};

export default OverlayComponent;
