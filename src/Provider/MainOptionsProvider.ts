import commandLineArgs, { OptionDefinition } from 'command-line-args';

const optionDefinitions: OptionDefinition[] = [
    {
        name: 'mode',
        type: String,
        defaultOption: true,
    },
];

export default (): ('crawl' | 'report' | 'slack') => {
    const options = commandLineArgs(optionDefinitions, { partial: true });
    const mode = options.mode;
    if (!mode) {
        throw new Error(`mode is required and must be "crawl" or "report".`);
    }

    return mode;
};
