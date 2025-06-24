import SectionHeader from "./SectionHeader";
import CoursesCarousel from "./CoursesCarousel";

export default function SubjectsDisplay() {
  return (
    <section className="subjects-display">
      <div className="container section-container">
        <SectionHeader
          title="Explore the scientific subjects"
          subTitle="Samples of lectures"
        />

        <CoursesCarousel
          coursesPerSlideNum={3}
          maxItemsPerRow={3}
          pricing="disable"
          carouselTitle
        />
      </div>
    </section>
  );
}
