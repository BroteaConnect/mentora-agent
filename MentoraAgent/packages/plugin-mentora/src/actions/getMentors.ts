import { composeContext, elizaLogger } from "@elizaos/core";
import { generateMessageResponse } from "@elizaos/core";
import {
    type Action,
    type ActionExample,
    type HandlerCallback,
    type IAgentRuntime,
    type Memory,
    ModelClass,
    type State,
} from "@elizaos/core";

import { createMentoraService } from "../services";
import { getMentorsTemplate } from "../templates";
import { validateMentoraConfig } from "../environment";
import { getMentorsExamples } from "../examples";
import { Mentor, MentoraResponse } from "../types";

export const getMentorsAction: Action = {
    name: "GET_MENTORS",
    description: "Retrieve mentors data from Mentora platform",
    similes: [
        "fetch mentors information",
        "get mentors data",
        "retrieve mentor profiles",
    ],
    examples: getMentorsExamples,
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback: HandlerCallback
    ) => {
        elizaLogger.debug("🔵 Iniciando GET_MENTORS handler");

        // Initialize/update state
        let currentState: State = state;
        elizaLogger.debug("🔵 Estado inicial:");

        if (!currentState) {
            currentState = (await runtime.composeState(message)) as State;
            elizaLogger.debug("🔵 Estado compuesto:");
        }
        currentState = await runtime.updateRecentMessageState(currentState);
        elizaLogger.debug("🔵 Estado actualizado:");

        // TODO: CRIS - Fix this
        // // state -> context
        // const mentorsContext = composeContext({
        //     state: currentState,
        //     template: getMentorsTemplate,
        // });
        // elizaLogger.debug("🔵 Contexto generado:");

        // // context -> content
        // const content = await generateMessageResponse({
        //     runtime,
        //     context: mentorsContext,
        //     modelClass: ModelClass.SMALL,
        // });
        // elizaLogger.debug("🔵 Contenido generado: content", content);

        // // Validate request type
        // if (content?.requestType !== "mentors") {
        //     elizaLogger.debug("🔴 Tipo de solicitud inválido:", content?.requestType);
        //     return;
        // }
        elizaLogger.debug(
            "🔵 Tipo de solicitud válido, procediendo con la obtención de datos"
        );

        try {
            // Instantiate API service
            elizaLogger.debug("🔵 Validando configuración");
            const config = await validateMentoraConfig(runtime);
            elizaLogger.debug("🔵 Configuración validada:", config);

            elizaLogger.debug("🔵 Creando servicio de mentores");
            const mentoraService = createMentoraService(config.baseUrl);

            // Fetch mentors data
            elizaLogger.debug("🔵 Obteniendo datos de mentores");
            const mentorsData = await mentoraService.getMentors();
            elizaLogger.debug("🔵 Respuesta del servicio:", mentorsData);

            if (!mentorsData.success) {
                elizaLogger.error(
                    "🔴 Error al obtener datos de mentores:",
                    mentorsData.error
                );
                callback({
                    text: `Error fetching mentors data: ${mentorsData.error}`,
                    content: { error: mentorsData.error },
                });
                return false;
            }

            elizaLogger.success("🟢 Datos de mentores obtenidos exitosamente");
            elizaLogger.debug("🔵 Datos:", mentorsData.data);

            if (callback) {
                elizaLogger.debug("🔵 Ejecutando callback con los datos");
                callback({
                    text: `Here are the available mentors:\n\n${mentorsData.data.map(mentor => 
                        `👤 Name: ${mentor.name}\n` +
                        `💼 Skills: ${mentor.skills.join(', ')}\n` +
                        `📅 Schedule: ${mentor.schedule.join(', ')}\n` +
                        `🎯 Talent Score: ${mentor.talentPassportScore}\n` +
                        `💰 Wallet: ${mentor.wallet}\n`
                    ).join('\n')}`,
                    content: mentorsData.data,
                });
                return true;
            }
        } catch (error) {
            elizaLogger.error("🔴 Error en GET_MENTORS handler:", error);
            elizaLogger.debug("🔴 Stack trace:", error.stack);
            callback({
                text: `Error fetching mentors data: ${error.message}`,
                content: { error: error.message },
            });
            return false;
        }

        elizaLogger.debug("🔵 Finalizando handler sin callback");
        return;
    },
    validate: async (runtime: IAgentRuntime) => {
        elizaLogger.debug("🔵 Validando configuración en validate()");
        try {
            await validateMentoraConfig(runtime);
            elizaLogger.success("🟢 Validación exitosa");
            return true;
        } catch (error) {
            elizaLogger.error("🔴 Error en validación:", error);
            return false;
        }
    },
};
