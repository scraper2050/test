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
      "x-telemetryhub-key": process.env.TELEMETRY_KEY
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

