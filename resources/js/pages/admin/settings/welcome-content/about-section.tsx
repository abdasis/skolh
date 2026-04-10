import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/form/form-input';
import { FormIconPicker } from '@/components/form/form-icon-picker';
import { TiptapEditor } from '@/components/editor';
import type { FeatureCard } from '@/types';

interface AboutData {
    heading: string;
    content: string;
    feature_cards: FeatureCard[];
}

interface AboutSectionProps {
    data: AboutData;
    errors: Partial<Record<string, string>>;
    onChange: (about: AboutData) => void;
}

const AboutSection = ({ data, errors, onChange }: AboutSectionProps) => {
    const updateFeatureCard = (
        index: number,
        field: keyof FeatureCard,
        value: string,
    ) => {
        const cards = [...data.feature_cards];
        cards[index] = { ...cards[index], [field]: value };
        onChange({ ...data, feature_cards: cards });
    };

    const addFeatureCard = () => {
        if (data.feature_cards.length < 6) {
            onChange({
                ...data,
                feature_cards: [
                    ...data.feature_cards,
                    {
                        icon: 'Star',
                        title: '',
                        description: '',
                        stat_value: '',
                        stat_label: '',
                    },
                ],
            });
        }
    };

    const removeFeatureCard = (index: number) => {
        onChange({
            ...data,
            feature_cards: data.feature_cards.filter((_, i) => i !== index),
        });
    };

    return (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-b from-muted/60 to-muted/30 p-1 ring-1 ring-foreground/8">
            <div className="px-5 py-4">
                <p className="text-base font-semibold">Seksi Tentang</p>
                <p className="text-sm text-muted-foreground">
                    Konten pengenalan sekolah di bawah hero.
                </p>
            </div>
            <div className="overflow-hidden rounded-xl bg-background/90 ring-1 ring-foreground/6">
                <div className="space-y-5 p-5">
                    <FormInput
                        label="Judul Seksi"
                        value={data.heading}
                        onChange={(e) =>
                            onChange({ ...data, heading: e.target.value })
                        }
                        placeholder="Pendidikan Berkualitas dengan Nilai-Nilai Islam"
                        error={errors['about.heading']}
                    />

                    <TiptapEditor
                        label="Konten"
                        content={data.content}
                        onChange={(html) =>
                            onChange({ ...data, content: html })
                        }
                        folder="about"
                        placeholder="Tuliskan deskripsi tentang sekolah..."
                        error={errors['about.content']}
                    />

                    {/* Feature Cards */}
                    <div>
                        <div className="mb-3 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">
                                    Kartu Fitur
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Maks. 6. Grid highlight di bawah paragraf.
                                </p>
                            </div>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addFeatureCard}
                                disabled={data.feature_cards.length >= 6}
                            >
                                Tambah Kartu
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {data.feature_cards.length === 0 && (
                                <p className="rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground">
                                    Belum ada kartu fitur.
                                </p>
                            )}
                            {data.feature_cards.map((card, i) => (
                                <div
                                    key={i}
                                    className="rounded-lg border bg-muted/20 p-4"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Kartu {i + 1}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeFeatureCard(i)}
                                        >
                                            Hapus
                                        </Button>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <FormIconPicker
                                            label="Ikon"
                                            value={card.icon}
                                            onChange={(val) =>
                                                updateFeatureCard(
                                                    i,
                                                    'icon',
                                                    val,
                                                )
                                            }
                                            error={
                                                errors[
                                                    `about.feature_cards.${i}.icon`
                                                ]
                                            }
                                        />
                                        <FormInput
                                            label="Judul Kartu"
                                            value={card.title}
                                            onChange={(e) =>
                                                updateFeatureCard(
                                                    i,
                                                    'title',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Kurikulum Terpadu"
                                            error={
                                                errors[
                                                    `about.feature_cards.${i}.title`
                                                ]
                                            }
                                        />
                                        <div className="sm:col-span-2">
                                            <FormInput
                                                label="Deskripsi"
                                                value={card.description}
                                                onChange={(e) =>
                                                    updateFeatureCard(
                                                        i,
                                                        'description',
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Kurikulum nasional terintegrasi keislaman"
                                                error={
                                                    errors[
                                                        `about.feature_cards.${i}.description`
                                                    ]
                                                }
                                            />
                                        </div>
                                        <FormInput
                                            label="Nilai Statistik"
                                            value={card.stat_value}
                                            onChange={(e) =>
                                                updateFeatureCard(
                                                    i,
                                                    'stat_value',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="6"
                                            error={
                                                errors[
                                                    `about.feature_cards.${i}.stat_value`
                                                ]
                                            }
                                        />
                                        <FormInput
                                            label="Label Statistik"
                                            value={card.stat_label}
                                            onChange={(e) =>
                                                updateFeatureCard(
                                                    i,
                                                    'stat_label',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Tahun"
                                            error={
                                                errors[
                                                    `about.feature_cards.${i}.stat_label`
                                                ]
                                            }
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { AboutSection };
