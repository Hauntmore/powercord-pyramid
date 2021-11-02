const { Plugin } = require("powercord/entities");

module.exports = class Pyramid extends Plugin {
  startPlugin() {
    powercord.api.commands.registerCommand({
      command: "pyramid",
      description: "Generate a Pyramid in Ascii format.",
      usage: "{c} [--int]",
      executor: (number) => {
        function generatePyramid(size) {
          const a = new Array(size)
            .fill("*")
            .map((r, i) => r.repeat(i + 1).padStart(size));
          return a
            .map(
              (r, i) =>
                r + a.map((r) => r.split("").reverse().join("").substring(1))[i]
            )
            .join("\n");
        }

        try {
          const int = parseInt(number) || 5;

          const pyramid = generatePyramid(int);

          if (isNaN(int)) {
            return {
              send: false,
              result: "Your argument must be an instance of a number!",
            };
          } else {
            return {
              send: false,
              result: `\`\`\`\n${pyramid}\n\`\`\``,
            };
          }
        } catch (error) {
          return {
            send: false,
            result: `I just encountered an error!\n${error}`,
          };
        }
      },
    });
  }

  pluginWillUnload() {
    powercord.api.commands.unregisterCommand("pyramid");
  }
};
