"use client";
import React, { useEffect } from "react";

const KLAVIYO_COMPANY_ID = "RtKxgh";

interface Props {
  children: React.ReactNode;
}

/**
 * Combined provider: loads Klaviyo script (Active on Site, forms) 
 */
const KlaviyoProvider: React.FC<Props> = ({ children }) => {

  // Klaviyo: load script and init proxy/queue
  useEffect(() => {
    const existingScript = document.querySelector(
      `script[src*="klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}"]`
    );
    if (existingScript) return;

    if (!(window as any).klaviyo) {
      (window as any)._klOnsite = (window as any)._klOnsite || [];
      try {
        (window as any).klaviyo = new Proxy(
          {},
          {
            get: function (_n: any, i: string) {
              return i === "push"
                ? function (...args: any[]) {
                  (window as any)._klOnsite.push(...args);
                }
                : function (...args: any[]) {
                  const callback =
                    typeof args[args.length - 1] === "function"
                      ? args.pop()
                      : undefined;
                  return new Promise((resolve) => {
                    (window as any)._klOnsite.push([
                      i,
                      ...args,
                      (result: any) => {
                        if (callback) callback(result);
                        resolve(result);
                      },
                    ]);
                  });
                };
            },
          }
        );
      } catch (error) {
        (window as any).klaviyo = (window as any).klaviyo || [];
        (window as any).klaviyo.push = function (...args: any[]) {
          (window as any)._klOnsite.push(...args);
        };
      }
    }

    const script = document.createElement("script");
    script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${KLAVIYO_COMPANY_ID}`;
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);
  }, []);


  return <>{children}</>;
};

export default KlaviyoProvider;
