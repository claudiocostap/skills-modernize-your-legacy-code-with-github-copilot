# Test plan for the legacy accounting application

| Test Case ID | Test Case Description | Pre-conditions | Test Steps | Expected Result | Actual Result | Status | Comments |
| --- | --- | --- | --- | --- | --- | --- | --- |
| TC-01 | View current balance | Account has a starting balance of 1000.00 | Start app and choose option 1 | System displays the current balance of 1000.00 | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-02 | Credit account with valid amount | Account balance is 1000.00 | Choose option 2 and enter 250.50 | Balance increases to 1250.50 and confirmation is shown | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-03 | Debit account with sufficient funds | Account balance is 1000.00 | Choose option 3 and enter 200.25 | Balance decreases to 799.75 and confirmation is shown | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-04 | Attempt debit with insufficient funds | Account balance is 100.00 | Choose option 3 and enter 250.00 | System displays insufficient funds message and balance remains unchanged | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-05 | Invalid menu option | User is at the main menu | Enter a choice outside 1-4 | System displays invalid choice message and returns to menu | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-06 | Exit application | User is at the main menu | Choose option 4 | Application exits with goodbye message | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-07 | Numeric validation for amount entry | User selects a transaction option | Enter non-numeric input for credit or debit | System handles invalid input without corrupting balance | To be recorded during execution | Pass/Fail | Validate with stakeholder |
| TC-08 | Balance persistence across transactions | Account has a valid balance | Perform credit/debit operations in sequence | Balance persists across operations and reflects latest value | To be recorded during execution | Pass/Fail | Validate with stakeholder |
