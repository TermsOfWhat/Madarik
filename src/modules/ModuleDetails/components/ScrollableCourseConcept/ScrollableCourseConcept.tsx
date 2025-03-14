import CourseConcept from "../CourseConcept";
import styles from "../../ModuleDetails.module.scss";

import FloatingComponent from "../FloatingComponent";

function ScrollableCourseConcept({
  concepts,
  handleConceptClick,
}: {
  concepts: any[];
  handleConceptClick: (id: number) => void;
}) {
  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.conceptsContainer}>
        {concepts.map((concept, index) => (
          <section key={`section-${index}`} id={`section-${index}`}>
            <CourseConcept
              key={concept.id}
              title={concept.title}
              description={concept.description}
              status={concept.status as "completed" | "active" | "locked"}
              onClick={() => handleConceptClick(concept.id)}
              recommendedReadings={concept.recommendedReadings}
            />
          </section>
        ))}
      </div>

      <FloatingComponent sections={concepts} />
    </div>
  );
}

export default ScrollableCourseConcept;
