import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { DocumentLoadInstrumentation } from "@opentelemetry/instrumentation-document-load";
import { XMLHttpRequestInstrumentation } from "@opentelemetry/instrumentation-xml-http-request";
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

export const setUpTracer = () => {
  // Create a provider for activating and tracking spans
  const tracerProvider = new WebTracerProvider({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: "blueclerk_web"
    }),
});
  // Configure the exporter with TelemetryHub's endpoint and access token
  tracerProvider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter({
    url: "https://otlp.telemetryhub.com/v1/traces",
    headers: {
      "content-type": "application/json",
      "x-telemetryhub-key": process.env.REACT_APP_TELEMETRY_KEY
    }
  })));
  // Register the tracer to receive spans from instrumentation (see below)
  tracerProvider.register({
    // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
    contextManager: new ZoneContextManager(),
  });

  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new XMLHttpRequestInstrumentation({
        ignoreUrls: [/.*otlp\.telemetryhub\.com.*/],
      }),
      new UserInteractionInstrumentation(),
    ],
    tracerProvider: tracerProvider,
  });
}
