import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bot,
  RefreshCw,
  Plus,
  Play,
  Pause,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
  Terminal,
  Layers,
  ArrowRight,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  getAutomationStatus,
  runAutomationSync,
  toggleAutomation,
  addTopicToAutomation,
  AutomationState,
  AutomatedBook,
} from "@/lib/bookAutomation";
import { BOOK_CATEGORIES } from "@/lib/books";

export const BookAutomationPanel = ({ onBooksUpdated }: { onBooksUpdated?: () => void }) => {
  const [state, setState] = useState<AutomationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);

  // New queue item form
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Filosofia e Estoicismo");
  const [newPriority, setNewPriority] = useState<"alta" | "media" | "baixa">("alta");
  const [addingQueue, setAddingQueue] = useState(false);

  const loadStatus = async () => {
    try {
      const data = await getAutomationStatus();
      setState(data);
    } catch {
      // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSyncNow = async () => {
    setSyncing(true);
    try {
      const result = await runAutomationSync();
      if (result.success) {
        toast({
          title: "Novo livro importado com sucesso!",
          description: result.message,
        });
        await loadStatus();
        if (onBooksUpdated) onBooksUpdated();
      } else {
        toast({
          title: "Aviso de automação",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (e: any) {
      toast({
        title: "Erro ao sincronizar",
        description: e.message || "Falha na comunicação com o robô de livros",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    try {
      const updated = await toggleAutomation(checked);
      setState(updated);
      toast({
        title: checked ? "Automação ativada" : "Automação pausada",
        description: checked
          ? "O robô continuará trazendo livros periodicamente."
          : "Novas importações automáticas foram suspensas temporariamente.",
      });
    } catch {
      toast({ title: "Erro ao alterar estado da automação", variant: "destructive" });
    }
  };

  const handleAddToQueue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      toast({ title: "Informe o título do livro", variant: "destructive" });
      return;
    }
    setAddingQueue(true);
    try {
      const updated = await addTopicToAutomation(
        newTitle.trim(),
        newAuthor.trim() || "Autor Reconhecido",
        newCategory,
        newPriority
      );
      setState(updated);
      setNewTitle("");
      setNewAuthor("");
      toast({
        title: "Obra adicionada à fila!",
        description: `"${newTitle}" será importada automaticamente com todos os capítulos.`,
      });
    } catch {
      toast({ title: "Erro ao adicionar à fila", variant: "destructive" });
    } finally {
      setAddingQueue(false);
    }
  };

  if (loading && !state) {
    return (
      <div className="py-20 text-center text-muted-foreground flex items-center justify-center gap-2">
        <RefreshCw className="h-5 w-5 animate-spin" />
        <span>Carregando Central de Automação de Livros...</span>
      </div>
    );
  }

  const booksCount = state?.books?.length || 0;
  const queueCount = state?.queue?.length || 0;
  const isActive = state?.isActive ?? true;

  return (
    <div className="space-y-8">
      {/* Top Banner & Control Bar */}
      <div className="p-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-card shadow-soft">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 flex-shrink-0">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-medium text-foreground tracking-tight">
                  Motor de Ingestão Autônoma de Livros
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium ${
                    isActive
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                      : "bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`}
                  />
                  {isActive ? "Robô Ativo" : "Em Pausa"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 max-w-xl font-light">
                Monitora, extrai e gera novas obras completas para o site automaticamente com todos os capítulos,
                índices de leitura e notas contextuais.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/50">
              <Switch checked={isActive} onCheckedChange={handleToggle} id="auto-switch" />
              <Label htmlFor="auto-switch" className="text-xs font-normal cursor-pointer">
                {isActive ? "Automação Ligada" : "Pausada"}
              </Label>
            </div>

            <Button
              onClick={handleSyncNow}
              disabled={syncing}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-soft flex items-center gap-2 text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? "animate-spin" : ""}`} />
              <span>{syncing ? "Processando..." : "Sincronizar Novo Livro Agora"}</span>
            </Button>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border/50 text-xs">
          <div className="space-y-1">
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Obras no Acervo</span>
            <span className="text-lg font-light text-foreground">{booksCount} livros completos</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Fila de Importação</span>
            <span className="text-lg font-light text-foreground">{queueCount} obras agendadas</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Frequência</span>
            <span className="text-lg font-light text-foreground">A cada {state?.frequencyMinutes || 30} minutos</span>
          </div>
          <div className="space-y-1">
            <span className="text-muted-foreground block text-[11px] uppercase tracking-wider">Fontes Conectadas</span>
            <span className="text-lg font-light text-emerald-500">Gutenberg PT + IA</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left column: Add to queue form & Current Queue */}
        <div className="lg:col-span-5 space-y-6">
          {/* Add to Queue Card */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4 text-emerald-500" />
              <h4 className="text-sm font-medium text-foreground">Agendar Novo Livro para Importação</h4>
            </div>
            <p className="text-xs text-muted-foreground">
              Adicione qualquer título clássico ou moderno. O motor gerará e estruturará todos os capítulos
              automaticamente.
            </p>

            <form onSubmit={handleAddToQueue} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="q-title" className="text-xs">
                  Título da Obra
                </Label>
                <Input
                  id="q-title"
                  placeholder="Ex: Discurso do Método, O Banquete, etc."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="q-author" className="text-xs">
                  Autor
                </Label>
                <Input
                  id="q-author"
                  placeholder="Ex: René Descartes, Platão, etc."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs">Categoria</Label>
                  <Select value={newCategory} onValueChange={setNewCategory}>
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {BOOK_CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c} className="text-xs">
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs">Prioridade</Label>
                  <Select value={newPriority} onValueChange={(v: any) => setNewPriority(v)}>
                    <SelectTrigger className="text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alta" className="text-xs">
                        Alta (Próximo)
                      </SelectItem>
                      <SelectItem value="media" className="text-xs">
                        Média
                      </SelectItem>
                      <SelectItem value="baixa" className="text-xs">
                        Baixa
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={addingQueue || !newTitle.trim()}
                className="w-full mt-2 text-xs bg-foreground text-background hover:bg-foreground/90"
              >
                <Plus className="h-3.5 w-3.5 mr-1" />
                Adicionar à Fila de Automação
              </Button>
            </form>
          </div>

          {/* Pending Queue List */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-foreground">Fila de Espera de Livros</h4>
              </div>
              <span className="text-xs text-muted-foreground">{state?.queue?.length || 0} pendentes</span>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {(!state?.queue || state.queue.length === 0) && (
                <div className="py-8 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl">
                  Fila vazia. Adicione novas obras acima para serem importadas.
                </div>
              )}
              {state?.queue?.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="p-3 rounded-xl border border-border bg-background/50 flex items-center justify-between text-xs"
                >
                  <div className="min-w-0 pr-3">
                    <p className="font-medium text-foreground truncate">{item.title}</p>
                    <p className="text-[11px] text-muted-foreground truncate">
                      {item.author} · {item.category}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] uppercase font-medium tracking-wider flex-shrink-0 ${
                      item.priority === "alta"
                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Auto-imported Books Catalog & Terminal Logs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Imported Books Table */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                <h4 className="text-sm font-medium text-foreground">Livros Ingeridos pelo Robô</h4>
              </div>
              <span className="text-xs text-emerald-500 font-medium">100% com capítulos completos</span>
            </div>

            <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
              {state?.books?.map((b) => (
                <div
                  key={b.id}
                  className="p-3.5 rounded-xl border border-border hover:border-emerald-500/40 bg-background/60 transition-all flex items-center gap-3.5 group"
                >
                  <img
                    src={b.cover_url}
                    alt={b.title}
                    className="w-12 h-16 object-cover rounded shadow-sm flex-shrink-0 border border-border"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h5 className="text-sm font-medium text-foreground truncate group-hover:text-emerald-500 transition-colors">
                        {b.title}
                      </h5>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                        {b.chapters.length} Capítulos
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{b.author}</p>
                    <p className="text-[11px] text-muted-foreground/80 mt-1 line-clamp-1">{b.description}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-3 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10"
                    >
                      <Link to={`/ler/${b.id}`}>
                        <span>Ler</span>
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </Button>
                    <span className="text-[10px] text-muted-foreground">{b.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Real-time Activity Logs */}
          <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-muted-foreground" />
                <h4 className="text-sm font-medium text-foreground">Registro de Atividades da Automação (Logs)</h4>
              </div>
              <span className="text-[11px] text-muted-foreground">Últimos eventos do robô</span>
            </div>

            <div className="p-4 rounded-xl bg-black/90 font-mono text-[11px] text-zinc-300 max-h-[220px] overflow-y-auto space-y-1.5 border border-zinc-800">
              {state?.logs?.map((log) => (
                <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                  <span className="text-zinc-500 flex-shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString("pt-BR")}
                  </span>
                  <span
                    className={`flex-shrink-0 font-bold ${
                      log.level === "success"
                        ? "text-emerald-400"
                        : log.level === "warn"
                        ? "text-amber-400"
                        : log.level === "error"
                        ? "text-rose-400"
                        : "text-blue-400"
                    }`}
                  >
                    [{log.level.toUpperCase()}]
                  </span>
                  <span className="text-zinc-200">{log.message}</span>
                </div>
              ))}
              {(!state?.logs || state.logs.length === 0) && (
                <div className="text-zinc-500">Nenhum log registrado ainda.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
