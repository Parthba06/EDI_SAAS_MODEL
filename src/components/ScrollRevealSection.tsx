import ScrollReveal from './ScrollReveal';

const ScrollRevealSection = () => {
  return (
    <section className="w-full bg-[#F5F5F5] text-black border-t border-black/10 py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

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