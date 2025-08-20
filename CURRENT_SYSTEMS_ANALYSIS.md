# St. Luke's Current Systems Analysis & Migration Strategy

## 🎯 **Project Context**

**Goal**: Consolidate St. Luke's volunteer management from multiple platforms into one unified, church-specific application.

**Why**: Currently using 3+ different systems that create confusion, duplicate data entry, and fragmented volunteer experience.

---

## 🔍 **Current Systems in Use**

### **1. Table to Table I-Rescue App**
- **URL**: [https://tabletotable.org/i-rescue/](https://tabletotable.org/i-rescue/)
- **Purpose**: Greater Northern NJ food rescue opportunities
- **Coverage**: Bergen, Essex, Hudson, Morris, and Passaic counties
- **Current Usage**: St. Luke's volunteers use this for external food rescue opportunities
- **Limitations**: 
  - Generic platform, not church-specific
  - No integration with local St. Luke's operations
  - Separate volunteer management
  - No church branding or community feel

### **2. SignUpGenius**
- **URL**: [https://www.signupgenius.com/go/20F0D4AA9AA29A7FA7-50492726-hosl#/](https://www.signupgenius.com/go/20F0D4AA9AA29A7FA7-50492726-hosl#/)
- **Purpose**: Local pickup and dropoff scheduling for St. Luke's operations
- **Current Usage**: Primary tool for coordinating local food pantry logistics
- **Limitations**:
  - Generic platform, not food logistics specific
  - No food tracking or impact measurement
  - Limited reporting capabilities
  - No integration with other systems
  - Volunteer data scattered across platforms

### **3. Manual Processes**
- **Current Issues**: 
  - Phone calls and text messages for coordination
  - Paper-based tracking of food donations
  - No centralized volunteer database
  - Difficult to measure impact and generate reports

---

## 🚀 **What We're Building**

### **Unified Volunteer Management Platform**
- **Single Sign-On**: One place for all St. Luke's volunteer activities
- **Church Branding**: St. Luke's specific design and terminology
- **Integrated Workflows**: Seamless experience from signup to completion
- **Impact Tracking**: Comprehensive food donation and delivery metrics
- **Professional Reporting**: Data for church board, sponsors, and grants

### **Key Features**
1. **Quick Signup System**: No account required for occasional volunteers
2. **Full Account System**: For regular volunteers who want profiles
3. **Admin Dashboard**: Church board members can manage operations
4. **Food Logistics Tracking**: Pounds collected, items delivered, impact metrics
5. **Automated Communications**: Reminders, weekly digests, admin alerts

---

## 👥 **User Role Architecture**

### **Role 1: Guest Volunteers (No Account)**
```
Purpose: Random church members who want to help occasionally
Data Captured: Name, email, phone (for notifications)
Permissions: Sign up for tasks, receive reminders
Storage: GuestVolunteer model
Use Case: "I want to help this week but don't need an account"
```

### **Role 2: Registered Volunteers (Generic Users)**
```
Purpose: Regular volunteers who want accounts and profiles
Data Captured: Full profile, preferences, vehicle capacity, availability
Permissions: Sign up for tasks, manage profile, view history, set preferences
Storage: User + VolunteerProfile models
Use Case: "I volunteer regularly and want to track my contributions"
```

### **Role 3: Admin Users (Church Board)**
```
Purpose: Your grandpa and church board members who oversee operations
Data Captured: Full admin profile with management permissions
Permissions: 
  - Create and manage weekly schedules
  - Add/edit food pickup locations (restaurants, stores)
  - Add/edit food distribution points (pantries, shelters)
  - View comprehensive reports and analytics
  - Manage volunteer accounts and permissions
  - Send announcements and communications
Storage: User with ADMIN role
Use Case: "I need to manage the entire food pantry operation"
```

---

## 🔄 **Migration Strategy**

### **Phase 1: Core Platform (Current)**
- ✅ Basic volunteer signup system
- ✅ Task management and scheduling
- ✅ Food logistics tracking
- ✅ Admin dashboard for operations

### **Phase 2: Table to Table Integration**
- 🔄 Research Table to Table API availability
- 🔄 Explore data import/export options
- 🔄 Consider manual data entry if no API
- 🔄 Unified volunteer experience across platforms

### **Phase 3: SignUpGenius Replacement**
- 🔄 Migrate existing volunteer data
- 🔄 Import historical schedules and assignments
- 🔄 Train volunteers on new platform
- 🔄 Phase out SignUpGenius usage

---

## 📊 **Business Impact**

### **For Volunteers**
- **Simplified Experience**: One platform instead of multiple
- **Better Communication**: Automated reminders and updates
- **Impact Visibility**: See their contributions and community impact
- **Flexible Participation**: Quick signup or full account options

### **For Church Board (Admins)**
- **Centralized Management**: All operations in one place
- **Better Reporting**: Comprehensive data for sponsors and grants
- **Efficient Operations**: Automated scheduling and communications
- **Professional Appearance**: Church-branded, professional platform

### **For St. Luke's Organization**
- **Unified Brand**: Consistent volunteer experience
- **Data Consolidation**: Single source of truth for all operations
- **Scalability**: Platform can grow with organization needs
- **Cost Reduction**: Eliminate multiple platform subscriptions

---

## 🔧 **Technical Implementation**

### **Database Schema (Already Implemented)**
- **Users**: Role-based access control (ADMIN/VOLUNTEER)
- **VolunteerProfiles**: Full volunteer information
- **GuestVolunteers**: Quick signup without accounts
- **Sources**: Food pickup locations (restaurants, stores)
- **Recipients**: Food distribution points (pantries, shelters)
- **Tasks**: Pickup and delivery assignments
- **Signups**: Volunteer commitments
- **FoodLogs**: Impact tracking and metrics

### **Authentication Strategy**
- **Guest Users**: No authentication, data stored in GuestVolunteer
- **Regular Users**: Email-based authentication with Supabase
- **Admin Users**: Same authentication, elevated permissions via role

### **Permission System**
- **Guest**: Can view and sign up for tasks
- **Volunteer**: Can manage profile, view history, sign up for tasks
- **Admin**: Full access to all features and management tools

---

## 📝 **Next Steps**

1. **Implement Role-Based Access Control**: Ensure proper permission separation
2. **Admin Dashboard Enhancement**: Add location management capabilities
3. **Guest Volunteer Flow**: Optimize quick signup experience
4. **Table to Table Research**: Investigate integration possibilities
5. **Data Migration Planning**: Prepare for SignUpGenius transition

---

## 🎯 **Success Metrics**

- **Volunteer Adoption**: % of current volunteers using new platform
- **Task Completion Rate**: % of scheduled tasks completed
- **Food Impact**: Pounds of food collected and delivered
- **Admin Efficiency**: Time saved in weekly operations
- **Volunteer Satisfaction**: Feedback on platform usability

---

**This document should be updated as we progress through development and learn more about integration possibilities with existing systems.**
