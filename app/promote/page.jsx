import PromoteScrollLayout from '../../components/PromoteScrollLayout';
import PromoteSections from '../../components/PromoteSections';
import { getPromoteTocEntries } from '../../lib/promote';

export const metadata = {
  title: '漫步推薦',
  description:
    '旅宿、閱讀與好物：斑泥整理的合作導購與推薦清單，支持網站維運而不另加價。',
};

export default function PromotePage() {
  const tocEntries = getPromoteTocEntries();

  return (
    <PromoteScrollLayout tocEntries={tocEntries}>
      <PromoteSections />
    </PromoteScrollLayout>
  );
}
