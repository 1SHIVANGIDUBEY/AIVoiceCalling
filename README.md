```markdown
# AI Voice Calling CRM - Quick Start Guide

To run the full hybrid microservices application, open **four separate terminal tabs** and execute the commands below in order.

### Terminal 1: Auth Service (Node.js)
Handles user login and session tokens.
```bash
cd ~/internship/AIVoiceCalling/backend
npm start
```
*(Wait for: `🚀 Auth Server running on port 5000`)*

### Terminal 2: Lead Service (Spring Boot)
Handles CRM lead management and database operations.
```bash
cd ~/internship/AIVoiceCalling/AICallingBackend/lead-service
mvn spring-boot:run
```
*(Wait for: `Started LeadServiceApplication`)*

### Terminal 3: Campaign Service (Spring Boot)
Handles WhatsApp/Voice campaign execution.
```bash
cd ~/internship/AIVoiceCalling/AICallingBackend/campaign-service
mvn spring-boot:run
```
*(Wait for: `Started CampaignServiceApplication`)*

### Terminal 4: React Frontend
The main user interface. **Ensure Terminals 1, 2, and 3 are fully running before logging in.**
```bash
cd ~/internship/AIVoiceCalling
npm start
```
*(The app will automatically open at `http://localhost:3000`)*
```