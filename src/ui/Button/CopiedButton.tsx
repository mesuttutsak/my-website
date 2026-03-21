'use client'

import { cn } from "@/src/shared/lib/cn";
import { useClipboard } from "@/src/shared/hooks/useClipboard";
import Button from "@/src/ui/Button";

import { FaCheck } from 'react-icons/fa';
import { IoIosCopy } from "react-icons/io";
import styles from "./CopiedButton.module.scss";

const CopiedButton = ({ textToCopy }: { textToCopy: string }) => {
    const { copied, copy } = useClipboard(textToCopy);

    const handleCopy = () => {
      void copy();
    };

    return (
        <Button onClick={handleCopy} isDisabled={copied} variant="secondary">
            <span className={styles.copiedIcon}>
                <FaCheck className={cn('text-green-500', styles.icon, styles.tick, copied && styles.tickAnimation)} size={16} />
                <IoIosCopy className={cn(styles.icon, styles.default, copied && styles.tickAnimationReverse)} size={16} />
            </span>
            Copy Email
        </Button>
    )
}

export default CopiedButton
