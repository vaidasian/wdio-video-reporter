Feature: User interactions - Pass

  Scenario: user should be able to use inputs (should pass)
    Given user navigates to base url
    When user selects input field
    When user fills input field "12344321"
    Then verify input field contains "12344321"
