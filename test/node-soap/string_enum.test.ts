import test from "tape";
import { existsSync } from "fs";
import { parseAndGenerate } from "../../src";
import { Logger } from "../../src/utils/logger";
import { typecheck } from "../utils/tsc";

const target = "string_enum";

test(target, async (t) => {
    Logger.disabled();

    const input = `./test/resources/${target}.wsdl`;
    const outdir = "./test/generated";

    const expectedFiles = [
        "client.ts",
        "index.ts",
        "definitions/Request.ts",
        "definitions/Response.ts",
        "definitions/PersonType.ts",
        "definitions/Status.ts",
        "ports/EnumServicePort.ts",
        "services/EnumService.ts",
    ];

    t.test(`${target} - generate wsdl client`, async (t) => {
        await parseAndGenerate(input, outdir);
        t.end();
    });

    expectedFiles.forEach((file) => {
        t.test(`${target} - ${file} exists`, async (t) => {
            t.equal(existsSync(`${outdir}/stringenum/${file}`), true);
            t.end();
        });
    });

    t.test(`${target} - compile`, async (t) => {
        await typecheck(`${outdir}/stringenum/index.ts`);
        t.end();
    });
});
