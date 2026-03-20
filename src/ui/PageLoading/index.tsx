import Surface from '../Surface';
import { RiLoader4Line } from "react-icons/ri";
import styles from "./PageLoading.module.scss";

const PageLoading = () => {
  return (
    <Surface customClassname={[styles.loadingContainer]}>
      <RiLoader4Line size={60} />
    </Surface>
  )
}

export default PageLoading
