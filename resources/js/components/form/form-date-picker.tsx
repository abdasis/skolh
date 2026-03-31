import * as React from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

/**
 * Parse a YYYY-MM-DD string as a local-time Date (no UTC shift).
 * Use this instead of new Date(str) to avoid timezone offset issues.
 */
export function parseLocalDate(dateStr: string): Date {
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * Format a Date to YYYY-MM-DD string using local time (no UTC shift).
 * Use this instead of date.toISOString().split('T')[0].
 */
export function formatLocalDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
}
import { type DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import InputError from '@/components/ui/input-error';
import { FormLabel } from './form-label';

// --- Preset types ---

interface DatePreset {
    label: string;
    date: Date;
}

interface DateRangePreset {
    label: string;
    from: Date;
    to: Date;
}

// --- Single Date Picker ---

interface FormDatePickerSingleProps {
    mode?: 'single';
    label: string;
    value?: Date;
    onChange: (date: Date | undefined) => void;
    placeholder?: string;
    error?: string;
    description?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    dateFormat?: string;
    presets?: DatePreset[];
    fromDate?: Date;
    toDate?: Date;
    captionLayout?: 'label' | 'dropdown' | 'dropdown-months' | 'dropdown-years';
}

// --- Date Range Picker ---

interface FormDatePickerRangeProps {
    mode: 'range';
    label: string;
    value?: DateRange;
    onChange: (range: DateRange | undefined) => void;
    placeholder?: string;
    error?: string;
    description?: string;
    id?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
    dateFormat?: string;
    presets?: DateRangePreset[];
    fromDate?: Date;
    toDate?: Date;
    numberOfMonths?: number;
}

type FormDatePickerProps = FormDatePickerSingleProps | FormDatePickerRangeProps;

const FormDatePicker = (props: FormDatePickerProps) => {
    const {
        label,
        error,
        description,
        id,
        disabled,
        required,
        className,
        dateFormat = 'PPP',
        placeholder = 'Pick a date',
    } = props;

    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    const [open, setOpen] = React.useState(false);

    const displayValue = React.useMemo(() => {
        if (props.mode === 'range') {
            const range = props.value;
            if (!range?.from) return null;
            if (!range.to) return format(range.from, dateFormat);
            return `${format(range.from, dateFormat)} - ${format(range.to, dateFormat)}`;
        }
        const date = props.value;
        return date ? format(date, dateFormat) : null;
    }, [props.mode, props.value, dateFormat]);

    const hasPresets = props.presets && props.presets.length > 0;

    return (
        <div className="grid gap-2">
            <FormLabel htmlFor={inputId} required={required}>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={inputId}
                        variant="outline"
                        disabled={disabled}
                        aria-invalid={!!error}
                        data-empty={!displayValue}
                        className={cn(
                            'w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground',
                            error && 'border-rose-500 focus-visible:border-rose-500 focus-visible:ring-rose-500/20',
                            className,
                        )}
                    >
                        <CalendarIcon className="mr-2 size-4" />
                        {displayValue ?? <span>{placeholder}</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={cn('w-auto p-0', hasPresets && 'flex')}
                    align="start"
                >
                    {hasPresets && (
                        <div className="flex flex-col gap-1 border-r p-3">
                            {props.mode === 'range'
                                ? (props.presets as DateRangePreset[]).map((preset) => (
                                    <Button
                                        key={preset.label}
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start text-xs"
                                        onClick={() => {
                                            (props as FormDatePickerRangeProps).onChange({
                                                from: preset.from,
                                                to: preset.to,
                                            });
                                            setOpen(false);
                                        }}
                                    >
                                        {preset.label}
                                    </Button>
                                ))
                                : (props.presets as DatePreset[]).map((preset) => (
                                    <Button
                                        key={preset.label}
                                        variant="ghost"
                                        size="sm"
                                        className="justify-start text-xs"
                                        onClick={() => {
                                            (props as FormDatePickerSingleProps).onChange(preset.date);
                                            setOpen(false);
                                        }}
                                    >
                                        {preset.label}
                                    </Button>
                                ))
                            }
                        </div>
                    )}
                    {props.mode === 'range' ? (
                        <Calendar
                            mode="range"
                            selected={props.value}
                            onSelect={props.onChange}
                            numberOfMonths={props.numberOfMonths ?? 2}
                            fromDate={props.fromDate}
                            toDate={props.toDate}
                        />
                    ) : (
                        <Calendar
                            mode="single"
                            selected={props.value}
                            onSelect={(date) => {
                                props.onChange(date);
                                setOpen(false);
                            }}
                            fromDate={props.fromDate}
                            toDate={props.toDate}
                            captionLayout={props.captionLayout}
                        />
                    )}
                </PopoverContent>
            </Popover>
            {description && !error && <p className="text-muted-foreground text-xs">{description}</p>}
            <InputError message={error} />
        </div>
    );
};

export { FormDatePicker };
export type { FormDatePickerProps, DatePreset, DateRangePreset };
