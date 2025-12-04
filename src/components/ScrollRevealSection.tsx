import ScrollReveal from './ScrollReveal';

const ScrollRevealSection = () => {
  return (
    <section className="w-full py-20 px-6 md:px-10 lg:px-16" style={{ backgroundColor: '#EAEAEA' }}>
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          rotationEnd="top 70%"
          wordAnimationEnd="top 50%"
        >
          When does a creator stop growing?
          When the likes slow down? No.
          When views drop? No.
          A creator stops growing when they stop learning from their content.
          Let data guide your next breakthrough.
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ScrollRevealSection;