import ScrollReveal from './ScrollReveal';

const ScrollRevealSection = () => {
  return (
    <section className="w-full bg-[#EAEAEA] py-20 px-6 md:px-10 lg:px-16 !text-black !dark:text-black">
      <div className="max-w-[1400px] mx-auto !text-black !dark:text-black">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          rotationEnd="top 70%"
          wordAnimationEnd="top 50%"
          textClassName="!text-black !dark:text-black"
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
