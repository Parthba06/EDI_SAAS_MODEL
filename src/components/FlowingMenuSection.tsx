import FlowingMenu from './FlowingMenu';

const FlowingMenuSection = () => {
  const demoItems = [
    { link: '#', text: 'ANALYZE', image: 'https://picsum.photos/600/400?random=1' },
    { link: '#', text: 'OPTIMIZE', image: 'https://picsum.photos/600/400?random=2' },
    { link: '#', text: 'AUTOMATE', image: 'https://picsum.photos/600/400?random=3' },
    { link: '#', text: 'GROW', image: 'https://picsum.photos/600/400?random=4' }
  ];

  return (
    <section className="w-full h-[600px] relative bg-[#F9FAF7] text-black border-t border-black/10">
      <FlowingMenu items={demoItems} />
    </section>
  );
};

export default FlowingMenuSection;
