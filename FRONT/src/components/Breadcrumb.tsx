import { Breadcrumb } from "@codegouvfr/react-dsfr/Breadcrumb";


<Breadcrumb
  currentPageLabel="Page Actuelle"
  homeLinkProps={{
    href: '/'
  }}
  segments={[
    {
      label: 'Segment 1',
      linkProps: {
        href: '/segment-1'
      }
    },
    {
      label: 'Segment 2',
      linkProps: {
        href: '/segment-1/segment-2'
      }
    },
    {
      label: 'Segment 3',
      linkProps: {
        href: '/segment-1/segment-2/segment-3'
      }
    },
    {
      label: 'Segment 4',
      linkProps: {
        href: '/segment-1/segment-2/segment-3/segment-4'
      }
    }
  ]}
/>