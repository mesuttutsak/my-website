import Link from 'next/link';

import {
    ExperienceCatalogs,
    getEmploymentTypeLabel,
    getSkillLabel,
} from "@/src/features/portfolio/catalogs";
import type { ExperienceItem, ExperiencePeriod } from "@/src/features/portfolio/types";
import { formatDateRange } from "@/src/shared/lib/date";
import Surface from '@/src/ui/Surface';
import Text from '@/src/ui/Text';
import styles from "./Experience.module.scss";

const Item = ({
    data,
    catalogs,
}: {
    data: ExperienceItem;
    catalogs: ExperienceCatalogs;
}) => {
    const { company, website, skills, periods } = data;
    
  return (
        <Surface inOrder customClassname={[styles.item]}>
            <div className={styles.itemContainer}>
                <div className={styles.itemWrap}>
                    <div className={styles.heading}>
                        <div className='sm:inline-block'>
                            <Text tag="h4" customClassname={['sm:inline-block']} >
                                <Link href={website} target='_blank' >{company}</Link>
                            </Text>
                            <span className='sm:inline-block hidden px-2'>-</span>
                            <Text fontSize='md' tag="h4" customClassname={['inline-block']} >{periods[0].title}</Text>
                        </div>
                        { periods.length == 1 &&
                            <Text fontSize='sm' customClassname={['whitespace-nowrap']}>
                                {formatDateRange(periods[0].start_date, periods[0].end_date)}
                            </Text>
                        }
                    </div>

                    <Text fontSize='sm'>Skills: {skills.map((skill) => getSkillLabel(skill, catalogs)).join(" · ")} </Text>
                </div>
            </div>
            {/* {location} */}

            {
                periods.length > 1 && (
                    <ul className={styles.periods}>
                    {periods.map(
                        ({
                            title,
                            employment_type,
                            start_date,
                            end_date,
                        }: ExperiencePeriod ) => (
                            <li key={'jp_'+title+start_date}>
                                <Text fontSize='md'>{title} - {getEmploymentTypeLabel(employment_type, catalogs)}</Text> <Text fontSize='sm' customClassname={['whitespace-nowrap']}>{formatDateRange(start_date, end_date)}</Text>
                            </li>
                        )
                    )}
                </ul>
                )

            }

        </Surface>
    )
}

export default Item
