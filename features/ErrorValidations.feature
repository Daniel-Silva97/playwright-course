Feature: Ecommerce validations
  @Validation
  Scenario Outline: Place the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
        | username           | password  |
        | rahulshettyacademy | learning  |
        | hello              | hello123  |


# Parametrization, parallel, html, rerun failed tests