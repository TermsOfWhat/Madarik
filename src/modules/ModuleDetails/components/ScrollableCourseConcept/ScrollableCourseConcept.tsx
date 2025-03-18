import CourseConcept from "../CourseConcept";
import styles from "../../ModuleDetails.module.scss";

import FloatingComponent from "../FloatingComponent";
import { Chapter } from "@src/modules/LearningPath/data/pathTypes";

function ScrollableCourseConcept({ chapters }: { chapters: Chapter[] }) {
  return (
    <div className={styles.scrollableContainer}>
      <div className={styles.conceptsContainer}>
        {chapters.map((chapter, index) => (
          <section key={`section-${index}`} id={`section-${index}`}>
            <CourseConcept
              id={chapter.id}
              key={chapter.id}
              name={chapter.name}
              description={chapter.description}
              isCompleted={chapter.isCompleted}
              articles={chapter.articles}
              quiz={chapter.quiz}
            />
          </section>
        ))}
      </div>

      <FloatingComponent sections={chapters} />
    </div>
  );
}

export default ScrollableCourseConcept;
