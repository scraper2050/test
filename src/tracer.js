import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-web';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";

export const setUpTracer = () => {
  // Create a provider for activating and tracking spans
  const tracerProvider = new WebTracerProvider();
  // Configure the exporter with TelemetryHub's endpoint and access token
  tracerProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({
    url: "https://otlp.telemetryhub.com/v1/traces",
    headers: {
      "content-type": "application/json",
      "x-telemetryhub-key": "d9b960bc-cb9a-4b16-b2ac-f2835e70bb65:398c17cb-61ee-45d5-a9f3-264ca51d570c:4114641"
    }
  })));

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new XMLHttpRequestInstrumentation({
        ignoreUrls: [/.*otlp\.telemetryhub\.com.*/],
      }),
    ],
    tracerProvider: tracerProvider,
  });
  
  // Register the tracer to receive spans from instrumentation (see below)
  tracerProvider.register();
}

