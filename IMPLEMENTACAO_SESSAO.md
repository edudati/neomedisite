# Implementação de Autenticação com Sessões

## Resumo da Solução

Esta implementação cria um sistema de autenticação híbrido que:
1. Usa Firebase para autenticação inicial
2. Cria uma sessão no backend usando cookies HttpOnly
3. Gerencia o estado de autenticação no frontend com React Context
4. Protege rotas automaticamente

## Arquivos Criados/Modificados

### Frontend (React)

#### 1. `src/AuthContext.jsx` - Contexto de Autenticação
- Gerencia o estado global de autenticação
- Fornece funções `login()`, `logout()` e `checkSession()`
- Verifica automaticamente se há uma sessão válida ao carregar a app

#### 2. `src/ProtectedRoute.jsx` - Rota Protegida
- Componente que protege rotas que requerem autenticação
- Redireciona para login se não autenticado
- Mostra loading enquanto verifica a sessão

#### 3. `src/Home.jsx` - Página Principal
- Página para onde o usuário é redirecionado após login
- Mostra informações do usuário
- Botão de logout funcional

#### 4. `src/Login.jsx` - Atualizado
- Agora usa o contexto de autenticação
- Faz login no Firebase e depois cria sessão no backend
- Redireciona para `/home` após login bem-sucedido
- Interface melhorada com loading e tratamento de erros

#### 5. `src/App.jsx` - Atualizado
- Adicionado `AuthProvider` envolvendo toda a aplicação
- Nova rota `/home` protegida
- Estrutura de rotas atualizada

### Backend (FastAPI)

#### 6. `session.py` - Atualizado
Adicione este endpoint ao seu arquivo `session.py` existente:

```python
@router.get("/verify")
def verify_session(request: Request):
    """
    Verifica se há uma sessão válida e retorna os dados do usuário.
    """
    session_token = request.cookies.get("session")
    
    if not session_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nenhuma sessão encontrada"
        )
    
    try:
        decoded = firebase_auth.verify_id_token(session_token)
        return {
            "user_id": decoded["user_id"],
            "email": decoded["email"],
            "email_verified": decoded.get("email_verified", False)
        }
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Sessão inválida ou expirada"
        )
```

**IMPORTANTE:** Certifique-se de que o router está incluído corretamente no seu arquivo principal:

```python
app.include_router(session.router, prefix="/api/v1/session", tags=["session"])
```

E modifique o endpoint `create_secure_session` para retornar dados do usuário:

```python
return {
    "message": "Sessão criada com sucesso.",
    "user_id": decoded["user_id"],
    "email": decoded["email"],
    "email_verified": decoded.get("email_verified", False)
}
```

## Como Funciona

### 1. Fluxo de Login
1. Usuário digita email/senha no frontend
2. Frontend faz login no Firebase
3. Firebase retorna um JWT token
4. Frontend envia o token para `/api/v1/session` (POST)
5. Backend valida o token com Firebase Admin
6. Backend cria um cookie HttpOnly com o token
7. Frontend redireciona para `/home`

### 2. Verificação de Sessão
1. Ao carregar a app, `AuthContext` chama `/api/v1/session/verify` (GET)
2. Backend verifica se existe cookie de sessão
3. Se válido, retorna dados do usuário
4. Frontend atualiza o estado de autenticação

### 3. Proteção de Rotas
1. `ProtectedRoute` verifica se `isAuthenticated` é true
2. Se não autenticado, redireciona para `/`
3. Se autenticado, renderiza o componente filho

### 4. Logout
1. Usuário clica em "Sair"
2. Frontend chama `/api/v1/session/logout` (POST)
3. Backend remove o cookie de sessão
4. Frontend limpa o estado e redireciona para `/`

## Configuração CORS

Certifique-se de que seu backend FastAPI está configurado para aceitar cookies:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL do seu frontend
    allow_credentials=True,  # IMPORTANTE para cookies
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Vantagens desta Abordagem

1. **Segurança**: Cookies HttpOnly não podem ser acessados por JavaScript
2. **Performance**: Não precisa validar token a cada requisição
3. **UX**: Sessão persiste entre recarregamentos da página
4. **Flexibilidade**: Pode adicionar dados extras na sessão do backend
5. **Controle**: Logout centralizado no backend

## Próximos Passos

1. Adicione o endpoint `/verify` ao seu backend
2. Configure CORS corretamente
3. Teste o fluxo completo
4. Considere adicionar refresh tokens para sessões mais longas
5. Implemente middleware de autenticação para outras rotas protegidas

## Testando

1. Inicie o backend: `uvicorn main:app --reload`
2. Inicie o frontend: `npm run dev`
3. Acesse `http://localhost:5173`
4. Faça login com suas credenciais
5. Verifique se é redirecionado para `/home`
6. Teste o logout
7. Recarregue a página para verificar persistência da sessão 