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

interface WeeklyTasksEmailProps {
  weekRange: string
  openTasks: Array<{
    id: string
    title: string
    date: string
    startTime: string
    endTime: string
    type: 'PICKUP' | 'DELIVERY'
    location: string
    capacity: number
    claimed: number
  }>
  volunteerName: string
}

export default function WeeklyTasksEmail({
  weekRange,
  openTasks,
  volunteerName,
}: WeeklyTasksEmailProps) {
  const previewText = `${getOrgDisplayName()} - Tasks for ${weekRange}`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{getOrgDisplayName()}</Heading>
          <Heading style={h2}>Tasks for {weekRange}</Heading>
          
          <Text style={text}>
            Hello {volunteerName},
          </Text>
          
          <Text style={text}>
            Here are the available volunteer tasks for this week. Click any task to sign up instantly.
          </Text>

          {openTasks.length > 0 ? (
            <Section style={tasksSection}>
              {openTasks.map((task) => (
                <Section key={task.id} style={taskCard}>
                  <Heading style={h3}>{task.title}</Heading>
                  <Text style={taskDetails}>
                    📅 {task.date} • 🕐 {task.startTime} - {task.endTime}
                  </Text>
                  <Text style={taskDetails}>
                    📍 {task.location} • {task.type === 'PICKUP' ? 'Pick up' : 'Delivery'}
                  </Text>
                  <Text style={taskDetails}>
                    👥 {task.claimed}/{task.capacity} spots filled
                  </Text>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/opportunities?task=${task.id}`}
                    style={button}
                  >
                    I can take this
                  </Link>
                </Section>
              ))}
            </Section>
          ) : (
            <Text style={text}>
              All tasks for this week have been claimed! Thank you for your dedication.
            </Text>
          )}

          <Text style={text}>
            Thank you for your service to our community.
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

const tasksSection = {
  margin: '30px 0',
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

const button = {
  backgroundColor: '#0070f3',
  borderRadius: '6px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  margin: '16px 0',
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
