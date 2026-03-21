import { useLocale, useTranslations } from "next-intl";
import type { EducationContent } from "@/src/features/portfolio/types";
import type { AppLocale } from "@/src/i18n/config";
import { formatDateRange } from "@/src/shared/lib/date";
import Section, { Headline } from "@/src/ui/Section";
import Surface from "@/src/ui/Surface";
import Text from "@/src/ui/Text";
import styles from "./Education.module.scss";

interface EducationProps {
    educations: EducationContent;
}

const Education = ({ educations }: EducationProps) => {
    const locale = useLocale() as AppLocale;
    const t = useTranslations("home.sections");
    const { name, department, grade, startDate, endDate, certificates } = educations;
    return (
        <Section draggable id="educations" customClassname={[styles.education]}>
            <Headline>
                <Text tag="h3">{t("education")}</Text>
            </Headline>
            <Surface inOrder>
                <div className={styles.row}>
                    <Text tag="h4">{name}</Text>
                    <Text fontSize="sm">{formatDateRange(startDate, endDate, "year", "", locale)}</Text>
                </div>
                <div className={styles.row}>
                    <Text fontSize="sm">{department} - {grade}</Text>
                </div>
            </Surface>
            <Surface inOrder customClassname={['flex flex-col gap-6']}>
                {certificates.map((obj, i) => {
                    const { title, period } = obj;

                    return (
                        <div key={'p_' + i} className="flex flex-col gap-3" >
                            <Text tag="h4" fontSize="md">{title}</Text>
                            <ul className="flex flex-col gap-2 ml-3 pl-3">
                                {period.map((e, i) => <li key={'p2_' + i} className="d-block">
                                    <Text fontSize="sm">{e}</Text>
                                </li>)}
                            </ul>
                        </div>)
                })
                }

            </Surface>
        </Section>
    );
};

export default Education;
