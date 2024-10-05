Feature: User interactions - Failure

  Background:
    Given user navigates to base url

  Scenario: user should be able to use inputs (should pass)
    When user selects input field
    When user fills input field "12344321"
    Then verify input field contains "12344321"

  Scenario: user should pick from dropdown menu (fails by design to gen video)
    When user selects link to dropdown
    When user selects dropdown
    When user selects dropdown option 2
    Then verify dropdown option "Option 1"

  Scenario: user should scroll a lot (fails by design to gen video)
    When user selects link to scroll
    When user selects paragraph to scroll
    Then verify scrolled elements count is 1
