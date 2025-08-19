import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components'
import { getOrgDisplayName, getParishName, getPublicUrl } from '@/lib/org'

interface TaskReminderEmailProps {
  taskTitle: string
  taskDate: string
  startTime: string
  endTime: string
  location: string
  type: 'PICKUP' | 'DELIVERY'
  volunteerName: string
}

export default function TaskReminderEmail({
  taskTitle,
  taskDate,
  startTime,
  endTime,
  location,
  type,
  volunteerName,
}: TaskReminderEmailProps) {
  const previewText = `Reminder for tomorrow: ${taskTitle}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{getOrgDisplayName()}</Heading>
          <Heading style={h2}>Reminder for tomorrow</Heading>
          
          <Text style={text}>
            Hello {volunteerName},
          </Text>
          
          <Text style={text}>
            This is a friendly reminder about your volunteer task tomorrow.
          </Text>

          <Section style={taskCard}>
            <Heading style={h3}>{taskTitle}</Heading>
            <Text style={taskDetails}>
              📅 {taskDate} • 🕐 {startTime} - {endTime}
            </Text>
            <Text style={taskDetails}>
              📍 {location} • {type === 'PICKUP' ? 'Pick up' : 'Delivery'}
            </Text>
          </Section>

          <Text style={text}>
            Please arrive on time and bring any necessary equipment. If you need to cancel or have questions, please contact us as soon as possible.
          </Text>

          <Text style={text}>
            Thank you for your service to our community!
          </Text>

          <Section style={footer}>
            <Text style={footerText}>
              {getOrgDisplayName()} · {getParishName()}
            </Text>
            <Link href={getPublicUrl()} style={footerLink}>
              Learn more about our pantry
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '560px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const h2 = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0',
}

const h3 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px',
  padding: '0',
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const taskCard = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
  border: '1px solid #e0e0e0',
}

const taskDetails = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0',
}

const footer = {
  borderTop: '1px solid #e0e0e0',
  marginTop: '40px',
  paddingTop: '20px',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#666',
  fontSize: '14px',
  margin: '8px 0',
}

const footerLink = {
  color: '#0070f3',
  fontSize: '14px',
  textDecoration: 'none',
}
