import FlowingMenu from './FlowingMenu';

const FlowingMenuSection = () => {
  const demoItems = [
    { link: '#', text: 'Mojave', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'Sonoma', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'Monterey', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'Sequoia', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <section className="w-full h-[600px] relative" style={{ backgroundColor: '#EAEAEA' }}>
      <FlowingMenu items={demoItems} />
    </section>
  );
};

export default FlowingMenuSection;
