using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Stripe;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StripeController : ControllerBase
    {
        private readonly PaymentIntentService _paymentIntentService;
        private readonly ILogger<StripeController> _logger;

        public StripeController(PaymentIntentService paymentIntentService, ILogger<StripeController> logger)
        {
            _paymentIntentService = paymentIntentService;
            _logger = logger;
        }

        /// <summary>
        /// Creates a payment intent.
        /// </summary>
        /// <param name="amount">The amount for the payment intent in euros.</param>
        /// <returns>A client secret for the payment intent.</returns>
        [HttpPost("Create-Payment-Intent")]
        public async Task<IActionResult> CreatePaymentIntent([FromBody] decimal amount)
        {
            if (amount <= 0)
            {
                return BadRequest("Amount must be greater than zero.");
            }

            try
            {
                _logger.LogInformation("Creating payment intent for amount: {Amount}", amount);

                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(amount * 100), // Stripe amount is in cents
                    Currency = "eur",
                    Metadata = new Dictionary<string, string>
                    {
                        { "integration_check", "accept_a_payment" }
                    }
                };

                var paymentIntent = await _paymentIntentService.CreateAsync(options);

                _logger.LogInformation("Payment intent created. Client secret: {ClientSecret}", paymentIntent.ClientSecret);

                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex, "Stripe exception occurred.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected exception occurred.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        /// <summary>
        /// Confirms a payment intent.
        /// </summary>
        /// <param name="paymentIntentId">The ID of the payment intent to confirm.</param>
        /// <param name="paymentMethodId">The payment method ID to use for the confirmation.</param>
        /// <returns>The status of the confirmed payment intent.</returns>
        [HttpPost("ConfirmPayment")]
        public async Task<IActionResult> ConfirmPayment([FromBody] string paymentIntentId, [FromQuery] string paymentMethodId)
        {
            if (string.IsNullOrWhiteSpace(paymentIntentId) || string.IsNullOrWhiteSpace(paymentMethodId))
            {
                return BadRequest("PaymentIntentId and PaymentMethodId are required.");
            }

            try
            {
                var options = new PaymentIntentConfirmOptions
                {
                    PaymentMethod = paymentMethodId,
                };

                var paymentIntent = await _paymentIntentService.ConfirmAsync(paymentIntentId, options);

                return Ok(new { paymentIntent.Id, paymentIntent.Status });
            }
            catch (StripeException ex)
            {
                _logger.LogError(ex, "Stripe exception occurred.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected exception occurred.");
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
