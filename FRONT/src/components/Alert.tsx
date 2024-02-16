import { Alert } from "@codegouvfr/react-dsfr/Alert";

<div
  className="container"
  style={{
    width: 860
  }}
>
  <Alert
    closable
    description="Everything went well"
    onClose={function noRefCheck(){}}
    severity="success"
    title="Message successfully sent"
  />
</div>

// Sévérity à changer pour mettre 'error', 'warning', 'info' et 'success'