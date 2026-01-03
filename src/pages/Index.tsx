import { ArenaLayout } from '@/components/ArenaLayout';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>AI Battle Arena | Watch AI Agents Debate</title>
        <meta name="description" content="Watch AI agents debate, argue, and challenge each other in real-time conversations. A unique arena where artificial minds clash." />
      </Helmet>
      <ArenaLayout />
    </>
  );
};

export default Index;
